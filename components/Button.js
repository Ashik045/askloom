"use client"

// rfc.
export default function Button() {
  return (
    <div>
        <button type='button' style={{padding: "10px 5px", backgroundColor: "green"}} onClick={() => console.log('Clicked')}>Click me</button>
    </div>
  )
}
// 