import express from 'express';
import chatCtrl from '../controllers/chat.controller';
import config from "../../config/config";
import expressJwt from "express-jwt/lib/index";

const router = express.Router();


router.route('/')
  // View messages to and from authenticated user
  .get(expressJwt({ secret: config.jwtSecret }), chatCtrl.getConversations);

router.route('/:conversationId')
  // Retrieve single conversation
  .get(expressJwt({ secret: config.jwtSecret }), chatCtrl.getConversation)

  // Send reply in conversation
  .post(expressJwt({ secret: config.jwtSecret }), chatCtrl.sendReply);

router.route('/new/:recipient')
  .post(expressJwt({ secret: config.jwtSecret }), chatCtrl.newConversation);

export default router;
