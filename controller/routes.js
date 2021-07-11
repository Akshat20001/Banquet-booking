const express = require('express');
const router = express.Router();
const user = require('../model/user');
const booked = require('../model/booked');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const Insta = require("instamojo-nodejs");
const nodemailer = require("nodemailer");
const { getPaymentDetails, getPaymentRequestStatus } = require('instamojo-nodejs');
require('./passportLocal')(passport);
require('./googleAuth')(passport)


var booking=booked.find({})
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index", { logged: true });
    } else {
        res.render("index", { logged: false });
    }
});
router.get('/index.ejs', (req, res) => {
  
    if (req.isAuthenticated()) {
        res.render("index", { logged: true });
    } else {
        res.render("index", { logged: false });
    }
});
router.get('/delhi.ejs', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("delhi", { logged: true });
    } else {
       res.render("delhi", { logged: false });
    }
});
router.get('/mumbai.ejs', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("mumbai", { logged: true });
    } else {
       res.render("mumbai", { logged: false });
    }
});
router.get('/Books.ejs', (req, res) => {
    booking.exec(function(err,data){
if(err) throw err
res.render("Books.ejs", { title:'Your bookings',records:data });
    })
   
});

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/gps-js.ejs', (req, res) => {
    res.render("gps-js.ejs");
});

router.get('/register', (req, res) => {
    res.render("register");
});
router.get('/contactgreet.ejs', (req, res) => {
    res.render("contactgreet");
});

router.get('/mail.ejs', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("mail", { logged: true });
    } else {
       res.render("mail", { logged: false });
    }
});

router.post( "/contact-us",
  (req, res) => {
    // instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // company's email and password
        user: 'banquetbooking231@gmail.com',
        pass: 'Kumarakshat1234',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // email options
    const mailOpts = {
      from: req.body.email,
      to: 'akshatkumar20001@gmail.com,arpanrajput785@gmail.com',
      subject: `Enquiry from ${req.body.name}`,
      html: `
      <div>
      <h2 style="color: #478ba2; text-align:center;">Client's name: ${req.body.name}</h2>
      <h3 style="color: #478ba2;">Client's email: (${req.body.email})<h3>
      </div>
      <h3 style="color: #478ba2;">Client's message: </h3>
      <div style="font-size: 30;">
      ${req.body.message}
      </div>
      `,
   
         attachments:[
                        {
                         
                            filename: `${req.body.myfile}`,
                          


                        }]
    };

    // send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        req.flash(
          "error",
          "An error occured... Please check your internet connection and try again later"
        );
        return res.redirect("/mail.ejs");
      } else {
        
        return res.redirect("/contactgreet.ejs");
      }
    });
  }
);

    router.post("/pay", (req, res) => {
        var name = req.body.name;
        var email = req.body.email;
        var date = req.body.date;
        var banquet = req.body.banquet;
        var guest = req.body.guest;
        var amount = req.body.amount;
        var payment = req.body.payment;
      console.log(name)
      console.log(email)
      console.log(date)
      console.log(banquet)
      console.log(guest)
      console.log(amount)
    
      router.get('/success' , (req, res) => {
        res.render("success" );
      booked({
      name: name,
        email: email,
        date:date,
        banquet: banquet,
        guest: guest,
        amount: amount,
    
    }).save((err, data) => {
        if (err) throw err;
        // login the user
        // use req.login
        // redirect , if you don't want to login
       
    
    });
});
      var data = new Insta.PaymentData();
    
    const REDIRECT_URL = "http://localhost:8000/success";
    
    data.setRedirectUrl(REDIRECT_URL);
    data.send_email = "True";
    
    data.purpose = banquet;
    data.name = name;
     
    data.email = email;
    data.date = date;
    data.amount = amount;
    
    
      Insta.createPayment(data, function (error, response) {
        if (error) {
          // some error
        } else {
          // Payment redirection link at response.payment_request.longurl
          console.log(response)
          res.send("Please check your email to make payment")
        }
      });
      });





router.post('/register', (req, res) => {
    // get all the values 
    const {firstname, lastname, email, contact,password} = req.body;
    // check if the are empty 
    if (!firstname || !lastname ||!email|| !contact || !password) {
        res.render("register", { err: "All Fields Required !"});
    }  else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("register", { err: "User Exists, Try Logging In !" });
            } else {
                // generate a salt
                bcryptjs.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    // hash the password
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        // save user in db
                        user({
                            firstname: firstname,
                            lastname:lastname,
                            email: email,
                            contact:contact,
                            password: hash,
                            googleId: null,
                            provider: 'email',
                        }).save((err, data) => {
                            if (err) throw err;
                            // login the user
                            // use req.login
                            // redirect , if you don't want to login
                            res.redirect('/login');
                        });
                    })
                });
            }
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    console.log("logout successfull")
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});
router.get('/sevenseas.ejs', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    res.render('sevenseas', { firstname: req.user.firstname,email: req.user.email, verified : req.user.isVerified });

});
router.get('/grandutsav.ejs', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    res.render('grandutsav', { firstname: req.user.firstname,email: req.user.email, verified : req.user.isVerified });

});
router.get('/ddclub.ejs', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    res.render('ddclub', { firstname: req.user.firstname,email: req.user.email, verified : req.user.isVerified });

});
router.get('/pearlgrand.ejs', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    res.render('pearlgrand', { firstname: req.user.firstname,email: req.user.email, verified : req.user.isVerified });

});
router.get('/thane.ejs', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    res.render('thane', { firstname: req.user.firstname,email: req.user.email, verified : req.user.isVerified });

});
router.get('/navi.ejs', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    res.render('navi', { firstname: req.user.firstname,email: req.user.email, verified : req.user.isVerified });

});


module.exports = router;