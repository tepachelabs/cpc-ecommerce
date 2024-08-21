import axios from 'axios'

type Params = {
  id: string
}

export async function GET (_: Request, context: { params: Params }) {
  const id = context.params.id

  const { data } = await axios.get(`https://webhooks.perro.cafe/api/products/${id}`)

  return new Response(
    JSON.stringify(data),
  )
}
