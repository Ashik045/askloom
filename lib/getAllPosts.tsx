export default async function getAllPosts() {
    const result =  await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
        // cache: "no-store" // by default "force-cache"
        // made this page static and check after 10 sec if any changes
        next: {
            revalidate: 10
        }
    })

    // check for error
    if (!result.ok) {
        throw new Error("There was an error fetching posts!")
    }

    return result.json()
} 