import React from "react";
import GoogleMap from "../map/GoogleMap";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/venue_show.css";
import "../../assets/stylesheets/map.css";
import { deleteVenue } from "../../util/venue_api_util";

class VenueShow extends React.Component {
    constructor(props) {
      super(props);
      // this.state = this.props.venue;
      this.state = {
        venue: "",
        venueb: this.props.venue
      }
      // this.handlelink = this.handlelink.bind(this)
    }

    // need to fix on refresh edit venue link
    handlelink = () => {
      // console.log("data=========qw====>",this.state.venueb)
      if (this.state.venueb === undefined) {
      if (this.state.venue.creator_id === this.props.currentUser.id) {
        return  <Link to={"/venueEdit"} className="create-button">
                Edit Venue
              </Link>
      }
    }
      else {
        if (this.state.venueb.creator_id === this.props.currentUser.id) {
          return  <Link to={"/venueEdit"} className="create-button">
                  Edit Venue
                </Link>
        }
      }
    };

    componentDidMount () {
      this.props.fetchVenue(this.props.match.params.id)
      .then((response) => {
        this.setState({
          venue: response.venue.data
      })
      })
    }
   deleteVenueCheck = (id) => {
// console.log("DaleteVenue======>",id)
deleteVenue(id).then(res=>{
this.props.history.push('/venues')
}).catch(err => {
alert("Delete Error")
})
   }
   handlelinkDelete(id) {
    // console.log("data=========qw====>",this.state.venueb)
    if (this.state.venueb === undefined) {
    if (this.state.venue.creator_id === this.props.currentUser.id) {
      return  <Link onClick={()=>this.deleteVenueCheck(id)} className="create-button">
             Delete Venue
            </Link>
    }
  }
    else {
      if (this.state.venueb.creator_id === this.props.currentUser.id) {
      return  <Link onClick={()=>this.deleteVenueCheck(id)} className="create-button">
     
                Delete Venue
              </Link>
      }
    }
  };
    render () {
      let loggedIn = this.props.currentUser
      // console.log("VenueData=====>1",this.state.venueb)
      if (this.state.venueb === undefined) {
      return(
        <div className="venue-show-main">
          <div className="buffer"></div>
          <div className="venue-show-top">
              <div className="left-column">
              <div className="map-container">
                     <GoogleMap venueLat={this.state.venue.latitude} venueLong={this.state.venue.longitude} />
                  
                 </div>
               
                 
               </div>
               <div className="right-column">
                 <div className="business-details">
                   <h1 className="venue-name">{this.state.venue.name}</h1>
                   <div className="cost-website">
                     <p id="vc-show">{this.state.venue.cost}</p>
                     <a href={this.state.venue.website} target="_blank" rel="noopener">
                       Website
                     </a>
                   </div>
                   <p className="vd-show">Details: {this.state.venue.description}</p>
                   <p className="va-show">Address: {this.state.venue.address}</p>
                 </div>
                 {loggedIn? this.handlelink(): null}
                 <div>
                 {loggedIn? this.handlelinkDelete(this.state.venue._id): null}
                 </div>
               </div>
               </div>




               <div className="venue-show-image-container">
                   <img src={this.state.venue.image} className="venue-show-image" />
                 </div>
             </div>

      )} 
      else {
        return(
          <>
          <div className="venue-show-main">
          <div className="buffer"></div>
          <div className="venue-show-top">
              <div className="left-column">
              <div className="map-container">
               <GoogleMap venueLat={this.state.venueb.latitude} venueLong={this.state.venueb.longitude} />
               </div>
                
                 
               </div>
               <div className="right-column">
                 <div className="business-details">
                   <h1 className="venue-name" >{this.state.venueb.name}</h1>
                   <div className="cost-website">
                     <p id="vc-show">{this.state.venueb.cost}</p>
                     <a href={this.state.venueb.website} target="_blank" rel="noopener">
                       Website
                     </a>
                   </div>
                   <p className="vd-show">Details: {this.state.venueb.description}</p>
                   <p className="va-show">Address: {this.state.venueb.address}</p>
                 </div>
                 {loggedIn? this.handlelink(): null}
                 <div>
                 {loggedIn? this.handlelinkDelete(this.state.venue._id): null}
                 </div>
               </div>
               </div>
                 
               <div className="venue-show-image-container">
                   <img src={this.state.venueb.image} className="venue-show-image" />
                 </div>
                
             </div>
               </>
        )
      }
    }

}

export default VenueShow;

