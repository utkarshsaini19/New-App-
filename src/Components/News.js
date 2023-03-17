import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0,
            options : {
                method: 'GET',
                headers: {
                  'X-RapidAPI-Key': props.apiKey,
                  'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
                }
              }
        }
        document.title = `${(this.props.category).charAt(0).toUpperCase() + (this.props.category).substring(1)} - News App`
    }

    handleUpdate = async () => {
        this.props.setProgress(10);
        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        const url1 = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${this.props.category}&pageNumber=${this.state.page}&pageSize=${this.props.pageSize}&autoCorrect=true&country=${this.props.country}`;
        this.setState({ loading: true })
        // let data = await fetch(url);
        let data1 = await fetch(url1,this.state.options);
        this.props.setProgress(30);
        // let parseData = await data.json();
        let parseData1 = await data1.json();
        this.props.setProgress(70);
        this.setState({ loading: false })
        // this.setState({
        //     articles: parseData.articles,
        //     totalResults: parseData.totalResults
        // })
        this.setState({
            articles: parseData1.value,
            totalResults: parseData1.totalCount
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.handleUpdate();

    }







    fetchMoreData = async () => {

        let temp= ++this.state.page
        // this.setState({ page: temp })
        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        const url1 = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${this.props.category}&pageNumber=${this.state.page}&pageSize=${this.props.pageSize}&autoCorrect=true&country=${this.props.country}`;
        this.setState({ loading: true })
        // let data = await fetch(url);
        let data1 = await fetch(url1,this.state.options);
        // let parseData = await data.json();
        let parseData1 = await data1.json();
        this.setState({ loading: false })
        // this.setState({
        //     articles: this.state.articles.concat(parseData.articles),
        //     totalResults: parseData.totalResults
        // })

        this.setState({
            articles: this.state.articles.concat(parseData1.value),
            totalResults: parseData1.totaltotalCount
        })
    };

    render() {
        return (
            <>
                <h2 className='text-center' style={{marginTop : '90px'}}>News App - Top Headlines on {(this.props.category).charAt(0).toUpperCase() + (this.props.category).substring(1)}</h2>

                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div key={element.url} className="col-md-4">
                                    {/* <NewsItem title={element.title.length <= 40 || element.title === null ? element.title : element.title.split(0, 40) + "..."} description={element.description.length <= 80 || element.description === null ? element.description : element.description.split(0, 80) + "..."} imageUrl={element.urlToImage} newsUrl={element.url} /> */}
                                    {/* <NewsItem source={element.source.name} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} /> */}
                                    <NewsItem source={element.provider.name} title={element.title} description={element.name} imageUrl={element.url} newsUrl={element.webpageUrl} author="Utkarsh" date='2023-03-12T19:28:52Z' />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>




            </>
        )
    }
}

export default News



