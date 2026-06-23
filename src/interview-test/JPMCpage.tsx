import { useEffect, useState } from 'react';

const Header = () => {
  return <>Head</>;
};

const SideBar = () => {
  return <>SideBar</>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Card = (cardData: any) => {
  return <>{JSON.stringify(cardData.cardData.work.title)}</>;
};

const Footer = () => {
  return <>Footer</>;
};

const MainScren = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[] | undefined>();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://openlibrary.org/people/mekBot/books/want-to-read.json'
      );
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log('JPMC', data.reading_log_entries);
      //     setData(data.reading_log_entries);
      //   });
      if (response.ok) {
        const resJson = await response.json();
        console.log('JPMC', resJson);
        setData(resJson.reading_log_entries);
      }
    };
    getData(); // the API call gets hit twice only happen in development env
  }, []);

  useEffect(() => {
    console.log('stateData', data);
  }, [data]);

  return (
    <>
      <div>
        <Header />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <SideBar />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(20px, 1fr))',
            gap: '10px',
          }}
        >
          {/*  eslint-disable @typescript-eslint/no-explicit-any */}
          {data?.map((d: any, idx: number) => (
            <div key={idx}>
              <Card cardData={d} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default MainScren;
