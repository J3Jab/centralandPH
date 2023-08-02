import Image from "next/image";
import Link from "next/link";

export interface SmallAdProps {
    imageSrc: string
}

export default function SmallAd(props: any) {
    return (
        <Link href="https://shopee.ph/">
            <Image
                src={`ads/small-ads/${props.imageSrc}`}
                alt="Small-Ad"
                width={300}
                height={250}
            />
        </Link>
       
    )
}