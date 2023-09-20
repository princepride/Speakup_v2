import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Box, List, ListItem, Tooltip, IconButton, Button } from '@mui/material';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import MainPage from './MainPage';
import StatisticPage from './StatisticPage';
import BookmarksPage from './BookmarksPage';
import SpeakUpIcon from '@mui/icons-material/SettingsVoice';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import StatisticIcon from '@mui/icons-material/Equalizer';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TasksPage from './TasksPage';
import { shutDown } from '../utils/connect'

const MainContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    height: 97vh;

    @media screen and (max-width: 1080px) {
        flex-direction: column;
    }
`;

const NavigationContainer = styled(Box)`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: #fff;
    width: 3%;

    @media screen and (max-width: 1080px) {
        width: 100%;
        height: auto;
    }
`;

const NavigationList = styled(List)`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;

    > div.autoFill {
        flex-grow: 1;
    }

    @media screen and (max-width: 1080px) {
        flex-direction: row;
        justify-content: space-around;
        margin-top: 0px;
    }
`;

const NavigationItem = styled(ListItem)`
    display: flex; 
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ContentContainer = styled(Box)`
    flex-grow: 1;
`;

const Overlay = styled.div`
    background-color: rgba(128, 128, 128, 0.3);
    height: 97vh;
    width: 99vw;
    position: absolute;
    z-index: 1200;
    overflow: hidden;
`;

const ShutDownCard = styled.div`
    background-color: white;
    padding: 16px;
    border-radius: 8px;
    margin-top: 200px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    display: flex;
    flex-direction: column;
`;

const ShutDownButton = styled(Button)`
    border: 1px solid;
    padding: 8px 16px;
    border-radius: 8px;
    margin-top:50px;
    margin-bottom:50px;
    margin-left:80px;
    margin-right:80px;
`;

const CenterButtonGroup = styled.div`
    display: flex;
    justify-content: center;
`;

function DynamicLine() {
    function n(n, e, t) {
        return n.getAttribute(e) || t
    }

    function e(n) {
        return document.getElementsByTagName(n)
    }

    function t() {
        var t = e("script"),
        o = t.length,
        i = t[o - 1];
        return {
            l: o,
            z: n(i, "zIndex", -1),
            o: n(i, "opacity", .5),
            c: n(i, "color", "0,0,50"), //颜色rgb
            n: n(i, "count", 199)
        }
    }

    function o() {
        a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }

    function i() {
        r.clearRect(0, 0, a, c);
        var n, e, t, o, m, l;
    
        s.forEach(function(i, x) {
            i.x += i.xa;
            i.y += i.ya;
            i.xa *= (i.x > a || i.x < 0) ? -1 : 1;
            i.ya *= (i.y > c || i.y < 0) ? -1 : 1;
            r.fillRect(i.x - .5, i.y - .5, 1, 1);
    
            for (e = x + 1; e < u.length; e++) {
                n = u[e];
    
                if (null !== n.x && null !== n.y) {
                    o = i.x - n.x;
                    m = i.y - n.y;
                    l = o * o + m * m;
    
                    if (l < n.max) {
                        if (n === y && l >= n.max / 2) {
                            i.x -= .03 * o;
                            i.y -= .03 * m;
                        }
    
                        t = (n.max - l) / n.max;
                        r.beginPath();
                        r.lineWidth = t / 2;
                        r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")";
                        r.moveTo(i.x, i.y);
                        r.lineTo(n.x, n.y);
                        r.stroke();
                    }
                }
            }
        });
    
        x(i);
    }
    var a, c, u, m = document.createElement("canvas"),
    d = t(),
    l = "c_n" + d.l,
    r = m.getContext("2d"),
    x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function (n) {
        window.setTimeout(n, 1e3 / 45)
    },
    w = Math.random,
    y = {
    x: null,
    y: null,
    max: 2e4
    };
    m.id = l
    m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o
    e("body")[0].appendChild(m)
    o()
    window.onresize = o
    window.onmousemove = function (n) {
        n = n || window.event
        y.x = n.clientX
        y.y = n.clientY
    }
    window.onmouseout = function () {
        y.x = null
        y.y = null
    };
    for (var s = [], f = 0; d.n > f; f++) {
      var h = w() * a,
        g = w() * c,
        v = 2 * w() - 1,
        p = 2 * w() - 1;
        s.push({
            x: h,
            y: g,
            xa: v,
            ya: p,
            max: 6e3
        })
    }
    u = s.concat([y])
    setTimeout(function () {
        i()
    }, 100)

    // 添加清除函数
    function cleanup() {
        // 移除 canvas 元素
        m && m.parentNode && m.parentNode.removeChild(m);
        
        // 移除事件监听器
        window.removeEventListener('resize', o);
        window.removeEventListener('mousemove', function (n) {
            n = n || window.event;
            y.x = n.clientX;
            y.y = n.clientY;
        });
        window.removeEventListener('mouseout', function () {
            y.x = null;
            y.y = null;
        });

        // 如果有其他需要清理的代码（如 clearInterval、cancelAnimationFrame 等），也在此处添加
    }
    return cleanup;
}

const DashboardPage = () => {
    const location = useLocation();
    const [shutDownSelectorVisible, setShutDownSelectorVisible] = useState(false);

    useEffect(() => {
        let cleanupFunction;
    
        if (shutDownSelectorVisible) {
            cleanupFunction = DynamicLine();
        }
    
        // 当组件卸载或 shutDownSelectorVisible 变为 false 时，执行清理操作
        return () => {
            if (cleanupFunction) cleanupFunction();
        };
    }, [shutDownSelectorVisible]);
    return (
        <>
        {
            shutDownSelectorVisible && 
            <Overlay onClick={event => event.stopPropagation()}>
                <ShutDownCard>
                    <h1 style={{"marginLeft":"20px"}}>SHUT DOWN YOUR SYSTEM ?</h1>
                    <CenterButtonGroup>
                    <ShutDownButton style={{"backgroundColor":"#F31559", "color":"white"}} onClick={shutDown}>CONFIRM</ShutDownButton>
                    <ShutDownButton onClick={() => {setShutDownSelectorVisible(false)}}>CANCEL</ShutDownButton>
                    </CenterButtonGroup>
                </ShutDownCard>
            </Overlay>
        }
        <MainContainer>
            <NavigationContainer>
                <NavigationList>
                    <NavigationItem component={Link} to="/">
                        <Tooltip title="Speak Up">
                            <IconButton style={{ color : location.pathname === '/' ? "#45CFDD" : "gray" }}>
                                <SpeakUpIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <NavigationItem component={Link} to="/bookmarks">
                        <Tooltip title="Bookmarks">
                            <IconButton style={{ color : location.pathname === '/bookmarks' ? "#45CFDD" : "gray" }}>
                                <BookmarksIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <NavigationItem component={Link} to="/statistic">
                        <Tooltip title="Statistic">
                            <IconButton style={{ color : location.pathname === '/statistic' ? "#45CFDD" : "gray" }}>
                                <StatisticIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <NavigationItem component={Link} to="/tasks">
                        <Tooltip title="Tasks">
                            <IconButton style={{ color : location.pathname === '/tasks' ? "#45CFDD" : "gray" }}>
                                <TaskAltIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <div className="autoFill" />
                    <NavigationItem>
                        <Tooltip title="Shut down">
                            {/*<IconButton style={{ color : "#F31559" }} onClick={shutDown}>*/}
                            <IconButton style={{ color : "#F31559" }} onClick = {() => setShutDownSelectorVisible(true)}>
                                <PowerSettingsNewIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                </NavigationList>
            </NavigationContainer>
            <ContentContainer>
                <Outlet />
                <Routes>
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/statistic" element={<StatisticPage />} />
                    <Route path='/tasks' element={<TasksPage />} />
                </Routes>
            </ContentContainer>
        </MainContainer>
        </>
    )
}

export default DashboardPage;