import Image from "next/image";
import ProductTag from "../ProductTag/ProductTag";
import "./ProductItem.scss";
import Link from "next/link";

// Component for product items
export interface ProductProps {
  product_name: string;
  product_price: string;
  product_link: string;
  product_image?: string;
  product_condition?: string;
  source: string;
}

export default function ProductItem(props: ProductProps) {
  // TODO: Temporarily set default value as carousell, remove when hardcode is fixed
  const brand = props.source ? props.source.toLowerCase() : 'carousell'
  const link = props.product_link.includes('https://') ? props.product_link : ('https://').concat(props.product_link)
  return (
    <Link href={link} target="_blank">
      <div className="product-item--container flex flex-col items-start pb-4 w-[260px] h-[395px] cursor-pointer relative">
        <div className="item-overlay absolute bg-white-400 z-10 transition w-full h-full opacity-0"></div>
        <div className="aspect-square w-full relative">
          <Image
            src={
              props.product_image
                ? props.product_image
                : "/product-placeholder.jpg"
            }
            unoptimized
            fill={true}
            sizes="200px"
            style={{
              objectFit: "cover",
            }}
            alt="Product Image"
            className="rounded-md"
          />
        </div>

        <div className="flex flex-col items-start px-4 mt-2 w-full">
          <div className="product-name--container">
            <h5>{props.product_name}</h5>
          </div>

          <p className="font-bold">PHP {Number(props.product_price).toFixed(2)}</p>

          {/* Tags and Source Logo */}
          <div className="flex justify-between self-end mt-3 w-full">
            <div className="flex flex-wrap gap-2">
              {/* <ProductTag color="green" label="Like New" />
              <ProductTag color="red" label="Second Hand" /> */}
              {/* <ProductTag color="red" label="Second Hand"/> */}
            </div>

            <div>
              <Image
                src={`/brand-logos/${brand}.png`}
                unoptimized
                width={30}
                height={30}
                alt="Brand Logo"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
