// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// changed the original Api handler
export default function handler(req, res) {
  res.status(200).json({ devOne: 'Md. Maruf Bin Salim Bhuiyan', devTwo: 'Farhan Tahmid' })
}
