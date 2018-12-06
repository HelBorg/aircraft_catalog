// import AppNavbar from "./AppNavbar";
//
// class Aircraft extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             aircrafts: [],
//             isLoading: true
//         };
//         this.remove = this.remove.bind(this);
//     }
//
//     componentDidMount() {
//         this.setState({isLoading: true});
//
//         fetch('api/aircraft')
//             .then(response => response.json())
//             .then(data => this.setState({
//                 aircrafts: data,
//                 isLoading: false
//             }));
//     }
//
//     render() {
//         const {aircraft} = this.state;
//         return <div>
//             <AppNavbar/>
//             <h1>{aircraft.name}</h1>
//             <h2>Model: {aircraft.model}</h2>
//         </div>
//     }
// }