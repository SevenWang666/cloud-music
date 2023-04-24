import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import Horizon from "../../baseUI/horizon-item";
import Scroll from "../../baseUI/scroll";
import * as actionTypes from "./store/action";
import Loading from "../../baseUI/loading";
import LazyLoad, { forceCheck } from "react-lazyload";
import { renderRoutes } from "react-router-config";
import {
  DataContext,
  CHANGE_ALPHA,
  CHANGE_CATEGORY,
  CHANGE_AREA,
} from "./data";
import { categoryTypes, alphaTypes, areaTypes } from "../../api/config";
import { NavContainer, List, ListItem, ListContainer } from "./style";

function Singers(props) {
  const {
    singerList,
    enterLoading,
    pageCount,
    pullUpLoading,
    pullDownLoading,
    songsCount,
  } = props;
  const {
    updateDispatch,
    getHotSingerDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
  } = props;
  // const [category, setCategory] = useState("");
  // const [alpha, setAlpha] = useState("");
  // const [area, setArea] = useState("");

  const { data, dispatch } = useContext(DataContext);
  const { category, alpha, area } = data.toJS();

  const handleUpdateAlpha = (val) => {
    dispatch({ type: CHANGE_ALPHA, data: val });
    updateDispatch(category, val, area);
  };

  const handleUpdateCatetory = (val) => {
    dispatch({ type: CHANGE_CATEGORY, data: val });
    updateDispatch(val, alpha, area);
  };

  const handleUpdateArea = (val) => {
    dispatch({ type: CHANGE_AREA, data: val });
    updateDispatch(category, alpha, val);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const singerListJS = singerList ? singerList.toJS() : [];

  useEffect(() => {
    getHotSingerDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`);
  };

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerListJS.map((item, index) => {
          return (
            <ListItem
              key={item.accountId + "" + index}
              onClick={() => enterDetail(item.id)}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("./singer.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title={"分类 (默认热门):"}
          handleClick={handleUpdateCatetory}
          oldVal={category}
        />
        <Horizon
          list={areaTypes}
          title={"国家地区 (默认热门):"}
          handleClick={handleUpdateArea}
          oldVal={area}
        />
        <Horizon
          list={alphaTypes}
          title={"首字母:"}
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        />
      </NavContainer>
      <ListContainer play={songsCount}>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      <Loading show={enterLoading} />
      {renderRoutes(props.route.routes)}
    </div>
  );
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"]),
  songsCount: state.getIn(["player", "playList"]).size,
});

const mapActionToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(actionTypes.getHotSingerList());
    },
    updateDispatch(category, alpha, area) {
      dispatch(actionTypes.changePageCount(0));
      dispatch(actionTypes.changeEnterLoading(true));
      dispatch(actionTypes.getSingerList(category, alpha, area));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(actionTypes.changePullUpLoading(true));
      dispatch(actionTypes.changePageCount(count + 1));
      if (hot) {
        dispatch(actionTypes.refreshMoreHotSingerList());
      } else {
        dispatch(actionTypes.refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(actionTypes.changePullDownLoading(true));
      dispatch(actionTypes.changePageCount(0));
      if (category === "" && alpha === "") {
        dispatch(actionTypes.getHotSingerList());
      } else {
        dispatch(actionTypes.getSingerList(category, alpha));
      }
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(React.memo(Singers));
