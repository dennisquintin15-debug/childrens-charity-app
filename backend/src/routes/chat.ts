import { Router, Request, Response } from 'express';

const router = Router();

interface ChatMessage {
  id: string;
  sender: string;
  senderRole: 'user' | 'admin';
  message: string;
  timestamp: string;
  read: boolean;
}

// Mock messages data
const messages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Admin',
    senderRole: 'admin',
    message: 'Hello! Welcome to our charity. How can we help you today?',
    timestamp: new Date().toISOString(),
    read: true,
  },
];

// Get all messages
router.get('/messages', (req: Request, res: Response) => {
  try {
    res.json({
      messages,
      unreadCount: messages.filter(m => !m.read).length,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Send message
router.post('/messages', (req: Request, res: Response) => {
  try {
    const { sender, senderRole, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ error: 'Sender and message are required' });
    }

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      senderRole: (senderRole as 'user' | 'admin') || 'user',
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };

    messages.push(newMessage);

    res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Mark message as read
router.put('/messages/:id/read', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = messages.find(m => m.id === id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.read = true;

    res.json({
      message: 'Message marked as read',
      data: message,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get unread count
router.get('/unread/count', (req: Request, res: Response) => {
  try {
    const unreadCount = messages.filter(m => !m.read).length;
    res.json({ unreadCount });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
