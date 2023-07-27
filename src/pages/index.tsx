import Head from 'next/head';
import ProductItem, {
	ProductProps,
} from '../components/ProductItem/ProductItem';
import TempProductItem from '../components/ProductItem/TempProductItem';
import { SimpleGrid, TextInput } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import SearchIcon from '../components/Icons/SearchIcon';
import HomeChip from '../components/Chips/HomeChip';
import Link from 'next/link';

export default function IndexPage() {
	const [isLoading, setLoading] = useState(false);
	const [numToShow, setNumToShow] = useState(8);
	const [hotItems, setHotItems] = useState([]);
	const [newItems, setNewItems] = useState([]);
	const [whatsHotChips, setWhatsHotChips] = useState([
		{ label: 'Games', isActive: false },
		{ label: 'Consoles', isActive: false },
		{ label: 'PC Parts', isActive: false },
		{ label: 'Peripherals', isActive: false },
	]);
	const [newlyListedChips, setNewlyListedChips] = useState([
		{ label: 'Games', isActive: false },
		{ label: 'Consoles', isActive: false },
		{ label: 'PC Parts', isActive: false },
		{ label: 'Peripherals', isActive: false },
	]);

  const getFilter = (chipObject) => {
    let filter = ''
    try {
      console.log(chipObject.label)
    
      if (chipObject.label === 'Games') {
        filter = '?filter=games';
      } else if (chipObject.label === 'Consoles') {
        filter = '?filter=consoles';
      } else if (chipObject.label === 'PC Parts') {
        filter = '?filter=pc';
      } else if (chipObject.label === 'Peripherals') {
        filter = '?filter=peripherals';
      }
    } catch (e) {
      console.log('no filters selected')
    } finally {
      return filter
    }
  }

	const handleSetActive = (label: String, setname: String) => {
		switch (setname) {
			case 'whatsHot':
				let newWhatsHotChips = whatsHotChips.map((chip) => {
					let returnChip = { ...chip };
					if (chip.label === label) returnChip.isActive = !chip.isActive;
					else returnChip.isActive = false;
          return returnChip
				});
				setWhatsHotChips(newWhatsHotChips);
        const hotChipsSelected = newWhatsHotChips.filter(chip => chip.isActive);
        const hotFilter = (getFilter(hotChipsSelected[0]))
        fetch(`/api/products/whats_hot${hotFilter}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setHotItems(data);
        });
				break;
			case 'newlyListed':
				let newNewlyListedChips = newlyListedChips.map((chip) => {
					let returnChip = { ...chip };
					if (chip.label === label) returnChip.isActive = !chip.isActive;
					else returnChip.isActive = false;
					return returnChip;
				});
				setNewlyListedChips(newNewlyListedChips);
        const newChipsSelected = newNewlyListedChips.filter(chip => chip.isActive);
        const newFilter = (getFilter(newChipsSelected[0]))
        fetch(`/api/products/newly_listed${newFilter}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setNewItems(data);
        });
				break;
			default:
				break;
		}
	};

	// Update hotItems whenever data changes
	useEffect(() => {
		setLoading(true);
		fetch(`/api/products/whats_hot`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setHotItems(data);
				setLoading(false);
			});
		setLoading(true);
		fetch(`/api/products/newly_listed`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setNewItems(data);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		const xsWindow = window.matchMedia('(min-width: 900px)');
		const smWindow = window.matchMedia('(min-width: 1200px)');
		const mdWindow = window.matchMedia('(min-width: 1440px)');
		const lgWindow = window.matchMedia('(min-width: 1800px)');
		const xlWindow = window.matchMedia('(min-width: 2560px)');

		smWindow.addEventListener('change', () => setNumToShow(8));
		smWindow.addEventListener('change', () => setNumToShow(9));
		mdWindow.addEventListener('change', () => setNumToShow(8));
		lgWindow.addEventListener('change', () => setNumToShow(12));
		xlWindow.addEventListener('change', () => setNumToShow(16));

		return () => {
			smWindow.removeEventListener('change', () => setNumToShow(8));
			smWindow.removeEventListener('change', () => setNumToShow(9));
			mdWindow.removeEventListener('change', () => setNumToShow(8));
			lgWindow.removeEventListener('change', () => setNumToShow(12));
			xlWindow.removeEventListener('change', () => setNumToShow(16));
		};
	}, []);

	return (
		<>
			<Head>
				<title>Centraland</title>
			</Head>

			{/* <section className='py-10'>
				<form action='/all'>
					<div className='flex justify-center'>
						<TextInput
							placeholder='Search'
							radius={10}
							value={searchVal}
							className='w-1/2'
							onChange={(event) => {
								setSearchVal(event.currentTarget.value);
							}}
							icon={<SearchIcon size={14} />}
						/>
					</div>
				</form>
			</section> */}

			{/* What's Hot Section */}
			<section className=''>
				<div className='flex flex-col gap-5 px-20'>
					<div className='flex justify-between items-center'>
						<h2 className='section-header'>What&apos;s Hot?</h2>
						<Link href='/all'>
							<p className='text-app-mint-green underline'>See more</p>
						</Link>
					</div>

					{/* Chips */}
					<div className='flex flex-wrap gap-3'>
						{/* <HomeChip label='Graphic Cards' isActive={true} />
						<HomeChip label='PS5 Games' isActive={false} />
						<HomeChip label='Nintendo Switch Games' isActive={false} />
						<HomeChip label='Keyboards' isActive={false} />
						<HomeChip label='Monitors' isActive={false} /> */}
						{whatsHotChips.map((chip) => (
							<HomeChip
								key={chip.label}
								label={chip.label}
								isActive={chip.isActive}
								handleSetActive={handleSetActive}
								setname={'whatsHot'}
							/>
						))}
					</div>

					<SimpleGrid
						// cols={6}
						// spacing='xs'
						verticalSpacing='xl'
						breakpoints={[
							// { maxWidth: 'md', cols: 4, spacing: 'xs' },
							// { maxWidth: 'sm', cols: 2, spacing: 'xs' },
							{ minWidth: 2560, cols: 8, spacing: 'xs' },
							{ minWidth: 1800, cols: 6, spacing: 'xs' },
							{ minWidth: 1440, cols: 4, spacing: 'xs' },
							{ minWidth: 1080, cols: 3, spacing: 'xs' },
							{ minWidth: 900, cols: 2, spacing: 'xs' },
						]}
						sx={{
							placeItems: 'center',
							alignItems: 'center',
						}}
					>
						{hotItems.slice(0, numToShow).map((item: ProductProps, index) => (
							<ProductItem key={index} {...item} />
						))}
					</SimpleGrid>
				</div>
			</section>

			{/* Newly Listed */}
			<section className=''>
				<div className='flex flex-col gap-5 px-20'>
					<div className='flex justify-between items-center'>
						<h2 className='section-header'>Newly Listed</h2>
						<Link href='/all'>
							<p className='text-app-mint-green underline'>See more</p>
						</Link>
					</div>

					{/* Chips */}
					<div className='flex flex-wrap gap-3'>
						{/* <HomeChip label='Graphic Cards' isActive={true} />
						<HomeChip label='Xbox Games' isActive={false} />
						<HomeChip label='Mousepads' isActive={false} />
						<HomeChip label='Mouse' isActive={false} />
						<HomeChip label='Keyboards' isActive={false} /> */}
						{newlyListedChips.map((chip) => (
							<HomeChip
								key={chip.label}
								label={chip.label}
								isActive={chip.isActive}
								handleSetActive={handleSetActive}
								setname={'newlyListed'}
							/>
						))}
					</div>

					<SimpleGrid
						verticalSpacing='xl'
						breakpoints={[
							// { maxWidth: 'md', cols: 4, spacing: 'xs' },
							// { maxWidth: 'sm', cols: 2, spacing: 'xs' },
							{ minWidth: 2560, cols: 8, spacing: 'xs' },
							{ minWidth: 1800, cols: 6, spacing: 'xs' },
							{ minWidth: 1440, cols: 4, spacing: 'xs' },
							{ minWidth: 1080, cols: 3, spacing: 'xs' },
              { minWidth: 900, cols: 2, spacing: 'xs' },
						]}
						sx={{
							placeItems: 'center',
							alignItems: 'center',
						}}
					>
						{newItems.slice(0, numToShow).map((item: ProductProps, index) => (
							<ProductItem key={index} {...item} />
						))}
					</SimpleGrid>
				</div>
			</section>

			{/* For You */}
		</>
	);
}
