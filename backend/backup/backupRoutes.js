// router.get("/:username/matches/like/:user_id", async function (req, res, next) {
//   try {
//     let user = await User.getUserLikesById(
//       // req.params.user_id,
//       // req.params.username,
//       // req.params.id
//       req.params.currentUser,
//       req.params.user_id
//     );
//     console.log(req.params.user_id);
//     return res.json({
//       user,
//       currentUser: req.params.username,
//       user_id: req.params.user_id,
//     });
//   } catch (err) {
//     return next(err);
//   }
// });

// router.get("/:username/matches/like/:user_id", async function (req, res, next) {
//   try {
//     let user = await User.getLikes(req.params.username, req.params.user_id);
//     console.log(req.params.user_id);
//     return res.json({
//       user,
//       currentUser: req.params.username,
//       user_id: req.params.user_id,
//     });
//   } catch (err) {
//     return next(err);
//   }
// });

// router.get("/:username/matches/like/:user_id", async function (req, res, next) {
//   try {
//     let user = await User.likeMatch(
//       req.params.user_id,
//       req.params.username,
//       req.params.id
//     );
//     console.log(req.params.user_id);
//     return res.json({
//       user,
//       currentUser: req.params.username,
//       user_id: req.params.user_id,
//     });
//   } catch (err) {
//     return next(err);
//   }
// });

/** This route is posting but I don't see it in the DB???? */
// router.post(
//   "/:username/matches/like/:user_id",
//   async function (req, res, next) {
//     try {
//       let user = await User.getUserLikes(
//         req.params.username,
//         req.params.user_id
//       );
//       // let user = await User.addUserLikes(
//       //   req.params.user_id,
//       //   req.params.username,
//       //   req.params.liked_user_id
//       // );
//       return res.json({
//         user,
//         user_id: req.params.user_id,
//         username: req.params.username,
//       });
//     } catch (err) {
//       if (err.res) {
//         return res.status(err.res.status).json(err.res.data);
//         // return next(err);
//       }
//     }
//   }
// );
