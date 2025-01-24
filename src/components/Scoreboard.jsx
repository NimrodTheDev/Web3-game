import svg from '../images/logo.svg'
function Scoreboard({score}) {
    return(
        <div className="scoreBoard_ui">
            <img src={svg}></img>
            <div className="scoreBoardScore">
                <p>Sei</p>
                <span>{score}</span>
            </div>
        </div>
    )
}
export default Scoreboard