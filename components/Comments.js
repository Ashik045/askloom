
export default async function Comments({promise}) {

  // receive data parallely.
    const comments = await promise;

  return (

        <div style={{marginTop: "50px"}}>
        <h2>Comments</h2>
          {comments.map((comment) => {
            return <div key={comment.id} style={{marginTop: "15px"}}>
              <h3>{comment.email}</h3>
              <h5>{comment.body}</h5>

            </div>
          })}
        </div>

  )
}
