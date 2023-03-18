import Link from "next/link";

export default function Timeline ({ userName }) {
    return (
        <>
            <h1>This is a Timeline of: {userName}</h1>
            <h2>
                <Link href='/'>Go Home</Link>
            </h2>
        </>
    );
}
Timeline.getInitialProps = async () => {
    return fetch (
       'http://localhost:3000/api/hello' 
    )
    .then(res => res.json())
    .then(response => {
        console.log(response)
        const{userName} = response
        return{userName}
    })
    
}