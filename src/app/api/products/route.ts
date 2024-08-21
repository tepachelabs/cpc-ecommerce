import axios from 'axios'

export async function GET () {
  const { data } = await axios.get('https://webhooks.perro.cafe/api/products')

  return new Response(
    JSON.stringify(data),
  )
}
