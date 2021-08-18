import express from 'express'

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.send("//////")
})

router.get("/test", (req: any, res: any) => {
  res.send("ddddd")
});

export default router;