const router = require('express').Router();
const {
  User,
  Post,
  Post_meta,
  Post_comment,
  Post_category,
  Category
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['first_name',
        'last_name'],
      },
        {
          model: Post_comment,
          attributes: ['id']
        } ],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({
      plain: true
    }));
    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{
          model: User,
          attributes: {
            exclude: ['password']
          },

        },
        {
          model: Post_comment,
          include: [{
            model: User,
            attributes: {
              exclude: ['password',
                  // "first_name",
                  "middle_name", 
                  // "last_name",
                  "mobile",
                  "email",
                  "regiseredAt",
                  "lastLogin",
                  "intro",
                  "profile",
              ]
            },
          }],
        },

      ],

    });
    const posts = postData.get({
      plain: true
    });

  res.render('post', {
  ...posts,
  logged_in: req.session.logged_in
  });

  // if (!postData) {
  //   res.status(404).json({
  //     message: 'No products!'
  //   });
  //   return;
  // }
  // res.status(200).json(postData);

  } catch (err) {
    res.status(500).json(err);
  }
});
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post
      }],
    });
    const user = userData.get({
      plain: true
    });
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});


router.get('/create', withAuth, async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  try {
    if (req.session.logged_in) {
      res.render('create');
    
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/update/:id', withAuth, async (req, res) => {
  // If the user is already logged in, redirect the request to another route
try {
  const postData = await Post.findByPk(req.params.id, {
  });
  const posts = postData.get({
    plain: true
  });

  res.render('update', {
    ...posts,
    logged_in: req.session.logged_in
  });

} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;