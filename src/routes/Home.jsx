import {
  Box,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import CarouselSlick from "../components/CarouselSlick";
import CardItems from "../components/CardItems";
import TitleImageSkew from "../components/TitleImageSkew";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { comicsList, eventsList } from "../api";
import SkeletonList from "../components/SkeletonList";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import AOS from "aos";

const settings = {
  dots: false,
  autoplay: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
};

const featuresLists = [
  {
    title: "스마트웹3기",
    description: "동해물과 백두산이 마르고 닳도록",
    buttonText: "자세히보기",
  },
  {
    title: "API 요청량 하루 3000번 리미트",
    description:
      "하루 API요청 횟수가 3,000회로 제한되어 있어 컨텐츠가 보이지 않을 수 있습니다.",
    buttonText: "자세히보기",
  },
  {
    title: "React",
    description: "React + Typescript + Chakra UI를 활용한 마블페이지 제작",
    buttonText: "자세히보기",
  },
];

export default function Home() {
    useEffect(() => {
        AOS.init();
            },[]);
  const { data, isLoading } = useQuery("repoData", comicsList);
  console.log("로딩 : ", isLoading, "코믹데이터 : ", data);
  const { data: eventsData} = useQuery(
    "eventsData",
    eventsList
  );

  return (
    <>
    <HelmetProvider>
        <Helmet>
            <title>마블기모씨</title>
        </Helmet>
      {/* 캐러셀 */}
      <Box>
        <CarouselSlick />
      </Box>

      {/* 특장점 */}
      <HStack w="full" justifyContent="center" py="16" bg="gray.100">
        <Grid gap="4" w="7xl" templateColumns={"repeat(3, 1fr)"}>
          {featuresLists.map((item, i) => (
            <CardItems key={i} item={item} />
          ))}
        </Grid>
      </HStack>

      {/* 기울어진 이미지 타이틀 */}
      <TitleImageSkew
        title="Comics"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt est quos in cum delectus numquam corrupti eligendi unde itaque, natus voluptatem, esse corporis voluptate perferendis adipisci molestiae. Ipsa, non ducimus?"
        imgUrl="https://assets.vogue.in/photos/5ce412599cc0c0b8f5f9b4bf/4:3/w_1440,h_1080,c_limit/Everything-you-need-to-know-before-watching-Marvel-movies-this-year.jpg"
      />

      {/* Comics 컨텐츠 리스트 */}
      <VStack w="full" position="relative" h="400px">
        {/* 힌박스 위로 올라오게 하는 범위지정 */}
        <Box position="absolute" w="7xl" py="8" px="2" top={-16} bg="white">
          {isLoading ? <SkeletonList /> : ""}
          <Slider {...settings}>
            {data?.data?.results?.map((item, i) => (
              <Link to={`/comics/${item.id}?type=comics`}>
                <VStack key={i} w="full" h="full" role="group" cursor="pointer">
                  <Box
                    overflow="hidden"
                    w="170px"
                    h="240px"
                    _groupHover={{ transform: "scale(1.1)" }}
                    transition={"0.4s"}
                  >
                    <Image
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      alt={`Comics ${i}`}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                  <Text
                    transition={"0.4s"}
                    _groupHover={{ color: "red.500", fontWeight: "600" }}
                    mt="2"
                    px="2"
                  >
                    {item.title.substr(0, 36)}
                  </Text>
                </VStack>
              </Link>
            ))}
          </Slider>
        </Box>
      </VStack>

      {/* 이벤트 타이틀 */}
      {/* 기울어진 이미지 타이틀 */}
      <TitleImageSkew
        title="Events"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt est quos in cum delectus numquam corrupti eligendi unde itaque, natus voluptatem, esse corporis voluptate perferendis adipisci molestiae. Ipsa, non ducimus?"
        imgUrl="https://terrigen-cdn-dev.marvel.com/content/prod/1x/sre7000_trl_comp_wta_v0265.1061_r_0.jpg"
      />

      {/* Events 컨텐츠 리스트 */}
      <VStack w="full" position="relative" h="400px">
        {/* 힌박스 위로 올라오게 하는 범위지정 */}
        <Box position="absolute" w="7xl" py="8" px="2" top={-16} bg="white">
          <Slider {...settings}>
            {eventsData?.data?.results?.map((item, i) => (
              <Link to={`/events/${item.id}?type=events`}>
                <VStack key={i} w="full" h="full" role="group" cursor="pointer">
                  <Box
                    overflow="hidden"
                    w="170px"
                    h="240px"
                    _groupHover={{ transform: "scale(1.1)" }}
                    transition={"0.4s"}
                  >
                    <Image
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      alt={`Comics ${i}`}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                  <Text
                    transition={"0.4s"}
                    _groupHover={{ color: "red.500", fontWeight: "600" }}
                    mt="2"
                    px="2"
                  >
                    {item.title.substr(0, 36)}
                  </Text>
                </VStack>
              </Link>
            ))}
          </Slider>
        </Box>
      </VStack>
      </HelmetProvider>
    </>
  );
}

