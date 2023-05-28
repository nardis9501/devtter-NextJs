import { firestore } from "@/firebase/admin"

export default (request, response) => {
  const { query } = request
  const { id } = query

  if (!id) {
    response.status(400).json({
      error: "The 'id' parameter is missing. Please provide a valid 'id'.",
    })
    return
  }
  if (typeof id !== "string") {
    response.status(400).json({
      error: "The 'id' parameter is invalid. Please provide a valid 'id'.",
    })
    return
  }

  firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        response
          .status(404)
          .json({ error: "The requested devit does not exist." })
        return
      }
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      response.json({
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      })
    })
    .catch((error) => {
      console.error(error)
      response.status(500).json({ error: "Internal server error" })
    })
}
