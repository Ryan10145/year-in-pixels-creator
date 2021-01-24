const router = require('express').Router();
const passport = require('passport');
let {log, Status} = require('./route_logger');

router.route('/login').post((req, res, next) => {
    if(req.isAuthenticated()) {
        log(res, Status.ERROR, "The user is already logged in.");
        return;
    }

    passport.authenticate('local', (err, user, info) => {
        if(err) {
            log(res, Status.ERROR, err);
            return;
        }

        if(!user) {
            log(res, Status.ERROR, info);
            return;
        }
        
        req.logIn(user, (err) => {
            if(err) {
                log(res, Status.ERROR, err);
                return;
            }
            
            log(res, Status.SUCCESS, "Successfully logged in.");
        });
    })(req, res, next);
});

router.route('/logout').post((req, res, next) => {
    if(req.isAuthenticated()) {
        req.logOut();
        log(res, Status.SUCCESS, "Successfully logged out.");
    }

    log(res, Status.ERROR, "The user is not logged in.");
});

module.exports = router;
