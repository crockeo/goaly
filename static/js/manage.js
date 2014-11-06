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
        console.log(this.refs.public.getDOMNode().checked);

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

                    <div className="checkbox">
                        <label>
                            <input type="checkbox" ref="public" />
                            <span>Public?</span>
                        </label>
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
    getInitialState: function() {
        return { mode: 'default' };
    },

    finishGoal: function() {
        console.log('Finish' + this.props.gid);
    },

    editGoal: function () {
        console.log('Edit' + this.props.gid);
    },

    deleteGoal: function () {
        console.log('Delete' + this.props.gid);
    },

    defaultState: function () {
        return (
            <li>
                <h3>
                    {this.props.goal}
                    <span className="left-margined">
                        <button className="btn btn-success" onClick={this.finishGoal} >
                            <span className="glyphicon glyphicon-ok"></span>
                        </button>

                        <button className="btn btn-info" onClick={this.editGoal}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </button>

                        <button className="btn btn-danger" onClick={this.deleteGoal}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>
                    </span>
                </h3>
            </li>
        );
    },

    finishedState: function() {
        return (
            <li>
                <h3 className="done-goal">
                    {this.props.goal}

                    <span className="left-margined">
                        <button className="btn btn-danger" onClick={this.deleteGoal}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>
                    </span>
                </h3>
            </li>
        )
    },

    editingState: function() {

    },

    render: function () {
        if (this.state.mode == 'default')
            return this.defaultState();
        else
            return this.finishedState();
    }
});

// The list of goals.
var GoalList = React.createClass({
    getInitialState: function () {
        this.requestNew();
        return {
            loading: true,
            goals: []
        };
    },

    requestNew: function () {
        var self = this;
        setTimeout(function () {
            $.ajax({
                url   : '/api/pull/goals',
                method: 'GET'
            }).done(function (data) {
                self.setState({
                    loading: false,
                    goals  : data.goals
                })
            });
        }, 10);
    },

    render: function () {
        if (this.state.loading) {
            return (
                <h3 className="text-center">Loading...</h3>
            )
        } else if (this.state.goals.length === 0) {
            return (
                <h3 className="text-center">You have not set any goals</h3>
            );
        } else {
            var goals = [];
            this.state.goals.forEach(function (goal) {
                goals.push(
                    <Goal gid={goal._id} goal={goal.value} />
                );
            });

            return (
                <div className="col-md-9">
                    <ul>
                        {goals}
                    </ul>
                </div>
            );
        }
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
