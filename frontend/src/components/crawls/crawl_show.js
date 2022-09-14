import React, { useEffect ,useState} from "react";
import "../../assets/stylesheets/crawl_show.css";
import { Link } from "react-router-dom";

function CrawlShow(props) {
  const [updatedVoteCount, setUpdatedVoteCount] = useState(0);
  const [errorBot ,setErrorBot] = useState(0)
  const [buttonText , setButtonText] = useState('')
  useEffect(() => {
    const fetchData = async() => {
          await props.fetchAllVenues();
          await  props.fetchCrawl(props.match.params.id);
    }
   fetchData()
  }, [updatedVoteCount]);

  const crawlTitle = props.crawlsReducer?.byId?.data?.title;
  const crawlCategory = props.crawlsReducer?.byId?.data?.category;
  const crawlDescription = props.crawlsReducer?.byId?.data?.description;
  const crawlCost = props.crawlsReducer?.byId?.data?.cost;
  const crawlTime = props.crawlsReducer?.byId?.data?.time;
  const crawlVenues = props.crawlsReducer?.byId?.data?.venues[0]?.split(", ");
  var crawlVotes = props.crawlsReducer?.byId?.data?.votecount;
  var crawlId = props.crawlsReducer?.byId?.data?._id;
  var usersData = props.crawlsReducer?.byId?.data?.users
  //   const { title, category, description, time } =
  //     props.crawlsReducer?.byId?.data;
  console.log("Data(renderName before)========>", props.session);
  const renderName = (id) => {
    // console.log("Data(renderName before)========>", props.venueReducer?.venues);
    let text = props.venueReducer?.venues?.find((x) => x._id == id)?.name;
    return text;
  };
  const renderImageSrc = (id) => {
    let text = props.venueReducer?.venues?.find((x) => x._id == id)?.image;
    return text;
  };
  const renderCost = (id) => {
    let text = props.venueReducer?.venues?.find((x) => x._id == id)?.cost;
    return text;
  };
  const renderDescription = (id) => {
    let text = props.venueReducer?.venues?.find(
      (x) => x._id == id
    )?.description;
    return text;
  };
  
  const voteBot = async () => {
      var check =  usersData?.find((x) => x?.user_id == props.session.user.id)
   
    if(check == undefined){
       let updateVoteCount = crawlVotes + 1;
      let userObj = {user_id:props.session.user.id}
      let crwlArray = usersData
      crwlArray.push(
        userObj
      )
    
      var crawlObj = {

        ...props.crawlsReducer?.byId?.data,
        id: crawlId,
        users:crwlArray,
        votecount: updateVoteCount,
      };
      props.updateCrawl(crawlObj);
      setUpdatedVoteCount(updateVoteCount)
      setErrorBot(1)
      setButtonText('UnVote')
    }
    else {   
       let updateVoteCount = crawlVotes - 1;
      var removeUser = await usersData.filter(
        (item) => item.user_id != props.session.user.id
      );
       var crawlObj = {
         ...props.crawlsReducer?.byId?.data,
         id: crawlId,
         users: removeUser,
         votecount: updateVoteCount,
       };
       console.log("CrawlObj======>",crawlObj)
       props.updateCrawl(crawlObj);
       setUpdatedVoteCount(updateVoteCount)
      setErrorBot(2)
       setButtonText("Vote");
      
    }
    
  };
  useEffect(() => {
    var check = usersData?.find((x) => x?.user_id == props.session.user.id);
    if (check == undefined) {
      setButtonText("Vote");
    } else {
      setButtonText("UnVote");
    }
  }, [props.crawlsReducer?.byId?.data]);
  return (
    <div className="main-crawl-show-container">
      <div className="crawl-show-left">
        <div className="data-container">
          <div className="crawl-votes"> {crawlVotes}</div>
          <div className="crawl-title">{crawlTitle}</div>
          <div className="crawl-details-important">
            <div className="crawl-cost">{crawlCost}</div>
            <div className="crawl-category">{crawlCategory}</div>
            <div className="crawl-time">Duration: {crawlTime}</div>
          </div>

          <div className="crawl-description">{crawlDescription}</div>

          <div className="crawls-venues-container">
            {crawlVenues?.map((item) => (
              <div className="each-crawl">
                <div className="">
                  <Link to={`/venueShow/${item}`}>{renderName(item)}</Link>
                  <div>{renderCost(item)}</div>
                  <div>-{renderDescription(item)}</div>
                </div>
                <img className="crawl-venue-image" src={renderImageSrc(item)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="crawl-show-right">
        <div className="crawl-show-map-container">
          <div className="crawl-show-map">map</div>
        </div>

        <div className="crawl-comments-container">
          <p>comments-container</p>
        </div>
        <button className="button" id="vote-button" onClick={() => voteBot()} style={{backgroundColor:errorBot == 1 ?'green': errorBot==2 ? 'red' :'grey'}}>
         {buttonText}
        </button>
        {errorBot ==1 ? (
          <p>You successfully voted</p>
        ) : errorBot ==2 ? (
          <p>You already voted</p>
        ) : null}
      </div>
    </div>
  );
}

export default CrawlShow;
