// Name        : manage.jsx
// Author(s)   : Cerek Hillen
// Date Created: 11/6/2014
// Date Changed: 11/6/2014
//
// Description:
//   This is an attempt to model the manage page in React.

//////////
// Code //

// The submit panel on the left side.
var SubmitPanel = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();
        console.log(this.refs.goal.getDOMNode().value);
        this.refs.goal.getDOMNode().value = '';
    },

    render: function () {
        return (
            <div className="col-md-3">
                <form onSubmit={this.onSubmit} id="newGoalForm">
                    <div className="form-group">
                        <label>Your New Goal:</label>
                        <input className="form-control" type="text" placeholder="Enter your new goal!" ref="goal" required />
                    </div>

                    <div className="form-group">

                    </div>

                    <div className="form-group">
                        <button className="btn btn-default" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
});

// A single goal.
var Goal = React.createClass({
    render: function () {
        return (
            <li>
                <h3>{this.props.goal}</h3>
            </li>
        );
    }
});

// The list of goals.
var GoalList = React.createClass({
    render: function () {
        return (
            <div className="col-md-9">
                <ul>
                    <Goal goal="finish this shit" />
                    <Goal goal="no seriously" />
                    <Goal goal="haha" />
                </ul>
            </div>
        );
    }
});

// The page's application container.
var App = React.createClass({
    render: function () {
        return (
            <div className="row">
                <SubmitPanel />
                <GoalList />
            </div>
        );
    }
});

// Rendering the application.
React.render((
    <App />
), document.getElementById('wrapper'));
