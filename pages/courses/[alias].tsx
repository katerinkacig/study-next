import {withLayout} from "../../layout/Layout";
import {GetStaticProps, GetStaticPaths, GetStaticPropsContext} from "next";
import { ParsedUrlQuery } from 'node:querystring';
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopPageModel} from "../../interfaces/page.interface";

const firstCategory = 0;

function Course({page}: CourseProps): JSX.Element {
    //console.log(page)

    return (
        <>
            {page?.title}
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });

    return {
        paths: menu.slice(0, 2).flatMap(m => m.pages?.map(p => '/courses/' + p.alias)),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {

    if (!params) {
        return {
            notFound: true
        };
    }
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });

    const {data: page} = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);

    return {
        props: {
            menu,
            firstCategory,
            page
        }
    };
};

interface CourseProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
    page: TopPageModel;
}