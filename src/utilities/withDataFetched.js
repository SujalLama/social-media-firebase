import useQueryData from "./queryData";

const withDataFetched = (Component, param) => () => {
    const {isLoading, error, data} = useQueryData(param);
    if(isLoading) {
        // return <Container className="d-flex justify-content-center align-items-center mt-5">
        //             <Spinner animation="border" role="status">
        //                 <span className="visually-hidden">Loading...</span>
        //             </Spinner>
        //         </Container>
        return <h2>loading</h2>
    }

    if(error) {
        // return <Container className="mx-auto">
        //             <h3 style={{color: 'red'}}>{error.message}</h3>
        //         </Container>
        return <div>error</div>
    }
    return <Component data={data} />
}

export default withDataFetched;