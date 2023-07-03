import { Grid, Skeleton } from "@chakra-ui/react";

export default function SkeletonPage({ num, width = '180px', height = '240px', column }) {
    return (
        <Grid w="full" px="2" templateColumns={`repeat(${column}, 1fr)`}>
            {
                Array(num).fill("").map((_, i) => (
                    <Skeleton w={width} h={height} />
                ))
            }
        </Grid>
    )
}