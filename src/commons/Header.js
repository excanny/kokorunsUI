import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export class Header extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
        
          loading: true,
          isLinkDisable2: false,
          navigate: false,
          companies: [],
          associations: [],
        
        }

        this.logout = this.logout.bind(this);
      
      }

    logout()
    {
       
        localStorage.removeItem("full_token");
        localStorage.removeItem("access_token");
        // this.props.history.push("/signin");
        this.setState({ navigate : true });
        //alert("hi");
    }  


    async componentDidMount()
  {

    if(localStorage.getItem('access_token'))
    {
      this.setState({ isLogged : true });
    }

    //console.log(localStorage.getItem('access_token'));

    const headers = {

      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 

    }


    let one = "https://sheltered-chamber-63274.herokuapp.com/api/companies"
    let two = "https://sheltered-chamber-63274.herokuapp.com/api/associations";
    // let three = "https://api.storyblok.com/v1/cdn/stories/vue?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt"
     
    const requestOne = axios.get(one, {headers: headers});
    const requestTwo = axios.get(two, {headers: headers});
    // const requestThree = axios.get(three, {headers: headers});
     
    axios.all([
      requestOne, 
      requestTwo, 
      //requestThree
    ]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      // const responesThree = responses[2]
      // use/access the results 

      this.setState({ companies : responseOne.data.companies, associations : responseTwo.data.associations, 
         });

      //console.log(responseTwo);

    })).catch(errors => {
      // react on errors.
      console.log(errors);
    })


  }


    render() {

        const  navigate  = this.state.navigate;

        if(navigate){
            //return <Redirect to="/signin" />
            window.location.href = "/";
        }


        return (

            
            <header className="bg-white header-class" style={{borderBottom: '1px solid #ccc', height: '4rem'}}>
            <div className="row">
                <div className="col-md-3">
                <div className="pt-2 pl-2">
                    <a href="/">
                    <img src="assets/Images/Header%20and%20Footer/Logo.png" width="55%" /></a>
                    
                </div>
                </div>
                <div className="col-md-6">
                {/* <div class="mt-3" style="paddin7g-right: 4rem">
                        <input class="header-search-bar border" type="text" placeholder="Search for Something...." style="width: 79.5%"><button class="header-search-bar-button"><img class="search-icon" src="<?php echo base_url();?>/public/assets/Images/Header%20and%20Footer/search.png"></button>
                    </div> */}
                <div className="mt-3 input-group mb-3">
                    <input type="text" className="form-controld header-search-bar" placeholder="Search for Something..." style={{width: '86.3%', display: 'block', height: 34, padding: '7px 12px', fontSize: 14, lineHeight: '1.42857143', border: '1px solid #ccc'}} />
                    <div className="input-group-append">
                    <button className="btn p-0 pr-3 rounded-0" type="submit" style={{background: '#A63E5F'}}><i className="fa fa-search m-0 text-white" style={{fontSize: '.5rem'}} /></button>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="pt-4">
                    <div className="dropdown">
                    <button type="button" className="btn dropdown-toggle p-0 font-weight-bold" data-toggle="dropdown">
                        Pages
                    </button>
                    <div className="dropdown-menu shadow border-0">
                        <h1 className="dropdown-header mt-0 mb-0" style={{fontSize: '1.1rem'}}>Admin roles</h1>
                        
                        {this.state.companies.map((company, index) => (
                            <div key={index}>
                                <div>
                                    <Link className="dropdown-item text-danger font-weight-bold" to={`/company-dashboard/${company.company_id}`}>{company.company_name}</Link>
                                </div>
                            </div>
                        ))}
                       
                        {/*?php foreach ($company_admin_pages as $page) { ?*/}
                        <div className="pl-2">
                            {this.state.associations.map((association, index) => (
                                <div key={index}>
                                    <div>
                                        <Link className="dropdown-item text-primary font-weight-bold" to={`/association-dashboard/${association.association_id}`}>{association.association_name}</Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                       

                        <div className="dropdown-divider" />
                        <h1 className="dropdown-header mt-0" style={{fontSize: '1.1rem'}}>Sub-admin roles</h1>
                        {/*?php foreach ($association_subadmin_pages as $page) { ?*/}
                        <div className="pl-2">
                        <a className="dropdown-item text-danger font-weight-bold" href="<?php echo base_url('association/dashboard/'. $page['fassociation_id']); ?>">{/*?php echo strtoupper($page['fassociation_name']); ?*/}</a>
                        </div>
                        {/*?php } ?*/}
                        {/*?php foreach ($company_subadmin_pages as $page) { ?*/}
                        <div className="pl-2">
                        <a className="dropdown-item text-info font-weight-bold" href="<?php echo base_url('company/dashboard/'. $page['fcompany_id']); ?>">{/*?php echo strtoupper($page['fcompany_name']); ?*/}</a>
                        </div>
                        {/*?php } ?*/}
                        {/*?php foreach ($school_subadmin_pages as $page) { ?*/}
                        <div className="pl-2">
                        <a className="dropdown-item text-success font-weight-bold" href="<?php echo base_url('school/dashboard/'.$page['fschool_id']); ?>">{/*?php echo strtoupper($page['fschool_name']); ?*/}</a>
                        </div>
                        {/*?php } ?*/}
                    </div>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="pt-4">
                    <div className="dropdown">
                    <i className="fa fa-plus cursor p-0" data-toggle="dropdown"/>
                    <div className="dropdown-menu shadow border-0">
                        <a className="dropdown-item font-weight-bold" href="/company-register">Create Company Page</a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item font-weight-bold" href="/association-register">Create Association Page</a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item font-weight-bold" href="school-register">Create School Page</a>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="pt-3">
                    <a onClick={this.logout} className="cursor"><i className="fa fa-power-off text-primary cursor" data-toggle="tooltip" title="Logout" /></a>
                </div>
                </div>
            </div>
            </header>

        )
    }
}

export default Header
