import {Htag, Button} from "../components/index";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";

function Home(): JSX.Element {
  return (
      <>
          <Htag tag='h1'>Главная страница</Htag>
          <Button mod="primary">Нажми меня</Button>
          <Button mod="secondary">Нажми меня</Button>
      </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
    const firstCategory = 0;
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    console.log(menu);
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number
}