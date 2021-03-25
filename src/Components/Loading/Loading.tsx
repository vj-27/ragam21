import lgif from "../../assets/loading.gif";
export default function Loading(props:{loading:boolean}){
    if(props.loading)
    return(
        <div style={{width:"100vw",height:"100vh",position:"absolute",zIndex:1000,display:"flex",justifyContent:"center",alignItems:"center", background:"rgb(0,0,0)"}}>
            <img style={{margin:"auto"}}src={lgif} width="200px"/>
        </div>
    )
    else return null
}