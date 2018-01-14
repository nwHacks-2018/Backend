import express from 'express';
import chatCtrl from '../controllers/chat.controller';

const router = express.Router();


router.route('/')
  // View messages to and from authenticated user
  .get(chatCtrl.getConversations);

router.route('/:conversationId')
  // Retrieve single conversation
  .get(chatCtrl.getConversation)

  // Send reply in conversation
  .post(chatCtrl.sendReply);

router.route('/new/:recipient')
  .post(chatCtrl.newConversation);

export default router;
