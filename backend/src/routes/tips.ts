import { Router, Request, Response } from 'express';

const router = Router();

interface Tip {
  id: string;
  author: string;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  impact: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock tips data
const tips: Tip[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    title: 'More After-School Programs',
    description: 'We should offer more after-school tutoring and sports programs',
    upvotes: 24,
    downvotes: 2,
    impact: 22,
    timestamp: new Date().toISOString(),
    status: 'approved',
  },
  {
    id: '2',
    author: 'Mike Chen',
    title: 'Community Volunteer Days',
    description: 'Organize monthly volunteer days where community members can help',
    upvotes: 18,
    downvotes: 1,
    impact: 17,
    timestamp: new Date().toISOString(),
    status: 'approved',
  },
];

// Get all tips
router.get('/', (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    let filtered = tips;
    if (status) {
      filtered = tips.filter(t => t.status === status);
    }

    const sortedTips = filtered.sort((a, b) => b.impact - a.impact);

    res.json({
      tips: sortedTips,
      total: sortedTips.length,
      stats: {
        totalTips: tips.length,
        approvedTips: tips.filter(t => t.status === 'approved').length,
        pendingTips: tips.filter(t => t.status === 'pending').length,
        totalUpvotes: tips.reduce((sum, t) => sum + t.upvotes, 0),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new tip
router.post('/', (req: Request, res: Response) => {
  try {
    const { author, title, description } = req.body;

    if (!author || !title || !description) {
      return res.status(400).json({ error: 'Author, title, and description are required' });
    }

    const newTip: Tip = {
      id: Math.random().toString(36).substr(2, 9),
      author,
      title,
      description,
      upvotes: 0,
      downvotes: 0,
      impact: 0,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };

    tips.push(newTip);

    res.status(201).json({
      message: 'Tip submitted successfully',
      data: newTip,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get tip by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tip = tips.find(t => t.id === id);

    if (!tip) {
      return res.status(404).json({ error: 'Tip not found' });
    }

    res.json({ data: tip });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Upvote tip
router.post('/:id/upvote', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tip = tips.find(t => t.id === id);

    if (!tip) {
      return res.status(404).json({ error: 'Tip not found' });
    }

    tip.upvotes += 1;
    tip.impact = tip.upvotes - tip.downvotes;

    res.json({
      message: 'Tip upvoted',
      data: tip,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Downvote tip
router.post('/:id/downvote', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tip = tips.find(t => t.id === id);

    if (!tip) {
      return res.status(404).json({ error: 'Tip not found' });
    }

    tip.downvotes += 1;
    tip.impact = tip.upvotes - tip.downvotes;

    res.json({
      message: 'Tip downvoted',
      data: tip,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update tip status (admin only)
router.put('/:id/status', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const tip = tips.find(t => t.id === id);

    if (!tip) {
      return res.status(404).json({ error: 'Tip not found' });
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    tip.status = status;

    res.json({
      message: 'Tip status updated',
      data: tip,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
