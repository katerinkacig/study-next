import {Htag, Button} from "../components/index";
import {withLayout} from "../layout/Layout";

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