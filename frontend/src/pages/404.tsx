import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "@/common/fetch/apollo-client";
import ClientOnly from '@/common/fetch/ClientOnly';

export default function fourOhFour() {
    return (
        <>
            <Head>
                <title>404 bro</title>
            </Head>
            <main>
                <h1 className='text-8xl'>404</h1>
                <span className='text-2xl'>Game over</span>
                <p className='pb-2'>
                    Once upon a time, in a magical land called the Internet, there was a mischievous creature named 404. 404 loved to play pranks on unsuspecting visitors to the land, and his favorite trick was to make them think they had reached the end of the road.
                </p>
                <p className='pb-2'>
                    One day, a traveler came to the land looking for a very important page. He searched and searched, but no matter how hard he looked, he couldn't find it. Just as he was about to give up, he stumbled upon a sign that read, "404 Page Not Found." The traveler scratched his head, wondering what this could mean.
                </p>
                <p className='pb-2'>
                    Suddenly, 404 appeared out of nowhere, giggling mischievously. "Gotcha!" he shouted, pointing to the sign. "You've been tricked! There's no page here!"
                </p>
                <p className='pb-2'>
                    The traveler sighed in frustration. "You got me," he said. "But can you at least tell me where to find the page I'm looking for?"
                </p>
                <p className='pb-2'>
                    404 rubbed his chin thoughtfully. "Hmm, let me think...oh, I remember now! It's on a secret page that only I know about. But I'll give you a hint...it's definitely not on this page!"
                </p>
                <p>
                    And with that, 404 disappeared into thin air, leaving the traveler scratching his head once again. But at least he had a good laugh, and he knew that he would eventually find his page, even if it wasn't on the Internet's most mischievous creature's 404 page.
                </p>
            </main>
        </>
    )
}
