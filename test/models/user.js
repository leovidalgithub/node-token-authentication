'use strict';

const debug = require('debug')('test:models:user');
var utils = require('../utils');

var should = require('should');
var User = rootRequire('server/models').user;

describe('Users: models', () => {

  describe('#create()', () => {

    it('should create a new User', (done) => {

      var testUser = {
        name: 'Barack',
        surname: 'Obama',
        username: 'barackforpresident',
        emails: [
          {
            type: 'home',
            value: 'home@example.com'
          },
          {
            type: 'work',
            value: 'work@example.com'
          }
        ]
      };

      User.create(testUser, function (err, createdUser) {
      	debug(createdUser);
        should.not.exist(err);
        createdUser.name.should.equal('Barack');
        createdUser.surname.should.equal('Obama');
        createdUser.username.should.equal('barackforpresident');
        createdUser.emails[0].type.should.equal('home');
        createdUser.emails[0].value.should.equal('home@example.com');
        createdUser.emails[1].type.should.equal('work');
        createdUser.emails[1].value.should.equal('work@example.com');
        done();

      });

    });
  })

  describe('#hashPassoword()', function () {
    it('should return a hashed password asynchronously', function (done) {

      var password = 'secret';

      User.hashPassword(password, function (err, passwordHash) {
        should.not.exist(err);
        should.exist(passwordHash);
        debug(passwordHash);
        done();
      });
    });

  });

  describe('#comparePasswordAndHash()', function () {
    it('should return true if password is valid', function (done) {

      var password = 'secret';

      User.hashPassword(password, function (err, passwordHash) {
        User.comparePasswordAndHash(password, passwordHash, function (err, areEqual) {

          should.not.exist(err);
          areEqual.should.equal(true);
          done();

        });
      });
    });


    it('should return false if password is invalid', function (done) {

      var password = 'secret';

      User.hashPassword(password, function (err, passwordHash) {

        var fakePassword = 'imahacker';

        User.comparePasswordAndHash(fakePassword, passwordHash, function (err, areEqual) {

          should.not.exist(err);
          areEqual.should.equal(false);
          done();

        });
      });
    });

   });

  // describe('#hasRole ', function () {
  //   // we will set this value in the beforeEach function
  //   var user;

  //   // beforeEach test create a user
  //   beforeEach( (done) => {
  //     let userTest = { roles: ['admin', 'mod'] };
  //     User.create(userTest, (err, createdUser) => {
  //       user = createdUser;
  //       done();
  //     });
  //   });

  //   it('should return true if the user has role', (done) => {
  //     user.hasRole('admin').should.be.true;
  //     user.hasRole('mod').should.be.true;
  //     done();
  //   });

  //   it('should return false if the user does not have role', (done) => {
  //     user.hasRole('astronaut').should.be.false;
  //     user.hasRole('cowboy').should.be.false;
  //     done();
  //   });

  // });

  // describe('UserToken', () => {

  //   it('#new', () => {
  //     var userId = '000000000000000000000001';
  //     UserToken.new(userId, (err, userToken) => {
  //       // Confirm that that an error does not exist
  //       should.not.exist(err);
  //       should.exist(userToken.token);
  //       // the userId is a Schema.ObjectId so to test against our string
  //       // we need to convert it to a string
  //       userToken.userId.toString().should.equal(userId);
  //       done();
  //     });
  //   });

  // });

});