import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../redux/slice/teamSlice";
import { Link } from "react-router-dom";

const Team = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <section className="team section-padding">
      <div className="container">

        {/* Header */}
        <div className="row">
          <div className="col-md-12 mb-45 text-center">
            <h6 className="wow" data-splitting>The Soul Behind the Lens</h6>
            <h1 className="wow" data-splitting>Pro-team</h1>
          </div>
        </div>

        {/* Team Grid */}
        <div className="row">
          {teams?.filter(member => member.status === "active").length > 0 ? (
            teams
              .filter(member => member.status === "active")
              .map((member) => (

                <div className="col-lg-4 col-md-12 mb-45" key={member.id}>
                  <div className="item">
                    <div className="img">
                      <Link to="/team-details">
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}${member.image}`}
                          alt={member.name}
                          loading="lazy"
                        />
                      </Link>
                    </div>

                    <div className="bg"></div>

                    <div className="con">
                      <Link to="/team-details">
                        <div className="title"><span>{member.name}</span></div>
                        <div className="subtitle"><span>{member.role}</span></div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <h2 className="text-center" style={{ width: "100%" }}>No Team Members Found</h2>
          )}
        </div>

      </div>
    </section>
  );
};

export default Team;
