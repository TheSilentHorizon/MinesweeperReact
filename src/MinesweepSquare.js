import {Component} from "react";

export default class MinesweepSquare extends Component{

    constructor(props) {
        super(props);
    }

    async handleClick(copyLogic,copyIsHidden){
        this.props.onClick(copyLogic,copyIsHidden)
    }

    getByValue(value) {
        switch (value) {
            case -1: return "red"
            case 0: return "grey"
            case 1: return "blue"
            case 2: return "yellow"
            case 3: return "lime"
            case 4: return "orange"
            case 5: return "green"
            case 6: return "purple"
            case 7: return "brown"
            case 8: return "gold"
            default: return "grey"
        }
    }

    render() {
        return (
            <div onClick={()=> this.handleClick()} key={this.props.xCoord+this.props.yCoord} style={{
                borderColor:"black",
                borderWidth:1,
                borderStyle:"solid",
                width:20,
                backgroundColor: this.props.isHidden ? "lightgrey" : this.getByValue(this.props.value),
                height:20,
            }}>
                {this.props.isHidden ? "" : this.props.value}
            </div>
        )
    }
}
