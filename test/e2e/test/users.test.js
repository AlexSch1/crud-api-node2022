const {request, routes} = require("../../utils");

const TEST_USER_DATA = {
    username: 'TEST_USER',
  age: 22,
  hobbies: ['T35t']
};

describe('Users suite', () => {
  describe('#1 create new user and delete them', () => {
    it('should get all users', async () => {
      const usersResponse = await request
        .get(routes.users.getAll)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(usersResponse.status).to.equal(200);
      expect(usersResponse.body).to.be.length(0);
    });

    it('should create users', async () => {
      let userId;

      await request
          .post(routes.users.create)
          .set('Accept', 'application/json')
          .send(TEST_USER_DATA)
          .expect(201)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body.id).to.be.a('string');
            userId = res.body.id;
            jestExpect(res.body).toMatchObject({
                username: TEST_USER_DATA.username,
              age: TEST_USER_DATA.age,
              hobbies: TEST_USER_DATA.hobbies
            });
          });

        const deleteResponse = await request.delete(routes.users.delete(userId));
        expect(deleteResponse.status).oneOf([200, 204]);

    });
  });

  describe('#2 should create users and update', () => {
      it('should create users and update user', async () => {
          let userId;

          await request
              .post(routes.users.create)
              .set('Accept', 'application/json')
              .send(TEST_USER_DATA)
              .expect(201)
              .expect('Content-Type', /json/)
              .then(res => {
                  expect(res.body.id).to.be.a('string');
                  userId = res.body.id;
                  jestExpect(res.body).toMatchObject({
                      username: TEST_USER_DATA.username,
                      age: TEST_USER_DATA.age,
                      hobbies: TEST_USER_DATA.hobbies
                  });
              });

          const updatedUser = {
              ...TEST_USER_DATA,
              username: 'updated TEST_USER',
              id: userId
          };

          await request
              .put(routes.users.update(userId))
              .set('Accept', 'application/json')
              .send(updatedUser)
              .expect(200)
              .expect('Content-Type', /json/);

          const { id, ...expectedUser } = updatedUser;

          await request
              .get(routes.users.getById(userId))
              .set('Accept', 'application/json')
              .expect(200)
              .expect('Content-Type', /json/)
              .then(res => {
                  jestExpect(res.body).toMatchObject(expectedUser)
              });

          const deleteResponse = await request.delete(routes.users.delete(userId));
          expect(deleteResponse.status).oneOf([200, 204]);

      });
  });

    describe('#3 should return errors', () => {
        it('should return error if provide invalid id', async () => {
            await request
                .get(routes.users.getById('my Id'))
                .expect(400)
                .then(res => {
                    jestExpect(res.error.text).toBe('Invalid user id')
                });
        });

        it('should return error if user not found', async () => {
            await request
                .get(routes.users.getById('690c0214-9056-4efe-9303-66e8c43a7346'))
                .expect(404)
                .then(res => {
                    jestExpect(res.error.text).toBe('User do not exist')
                });
        });
        it('should return error if user data invalid', async () => {
            await request
                .post(routes.users.create)
                .set('Accept', 'application/json')
                .send({
                    username: 'TEST_USER',
                })
                .expect(400)
                .then(res => {
                    jestExpect(res.error.text).toBe('Invalid user information')
                });
        });

    });

});
