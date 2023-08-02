import Image from "next/image";
import Link from "next/link";

export interface BigAdProps {
    imageSrc: string
}

export default function BigAd(props: any) {
    return (
        <Link href="https://shopee.ph/">
            <Image
                src={`ads/big-ads/${props.imageSrc}`}
                alt="Big-Ad"
                width={700}
                height={200}
            />
        </Link>
    )
}