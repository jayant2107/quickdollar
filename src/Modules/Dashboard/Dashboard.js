import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const cardData = [
    {
      backgroundImage:
        "-webkit-linear-gradient(90deg, #3f5efb 0%, #fc466b 100%)",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          enable-background="new 0 0 32 32"
          viewBox="0 0 32 32"
          id="users"
          fill="#fff"
          textAnchor="start"
        >
          <path d="M10.6914062 10.2128906c0-1.7792969-1.4477539-3.2275391-3.2270508-3.2275391S4.237793 8.4335938 4.237793 10.2128906s1.4472656 3.2265625 3.2265625 3.2265625S10.6914062 11.9921875 10.6914062 10.2128906zM7.4643555 8.9853516c.6767578 0 1.2270508.5507812 1.2270508 1.2275391s-.550293 1.2265625-1.2270508 1.2265625c-.6762695 0-1.2265625-.5498047-1.2265625-1.2265625S6.7880859 8.9853516 7.4643555 8.9853516zM3 21.4326172c.5522461 0 1-.4472656 1-1 0-.2399292.0270996-.4754028.0749512-.7053223.1356201-.6515503.4561768-1.2524414.9401855-1.736084.6552734-.6552734 1.5263672-1.015625 2.453125-1.015625.2360229 0 .4688721.0244141.6928711.0706787.2287598.0472412.4483032.1173096.6518555.2105713.4995117.2236328 1.0942383.0078125 1.324707-.4951172.2294922-.5019531.0078125-1.0957031-.4946289-1.3251953-.6611328-.3017578-1.4130859-.4609375-2.1748047-.4609375-1.4609375 0-2.8344727.5683594-3.8671875 1.6015625C2.5683594 17.609375 2 18.9785156 2 20.4326172 2 20.9853516 2.4477539 21.4326172 3 21.4326172zM21.3085938 10.2128906c0 1.7792969 1.4477539 3.2265625 3.2270508 3.2265625s3.2265625-1.4472656 3.2265625-3.2265625-1.4472656-3.2275391-3.2265625-3.2275391S21.3085938 8.4335938 21.3085938 10.2128906zM24.5356445 11.4394531c-.6767578 0-1.2270508-.5498047-1.2270508-1.2265625s.550293-1.2275391 1.2270508-1.2275391c.6762695 0 1.2265625.5507812 1.2265625 1.2275391S25.2119141 11.4394531 24.5356445 11.4394531zM24.5317383 14.9755859c-.7617188 0-1.5136719.1591797-2.1748047.4609375-.5024414.2294922-.7241211.8232422-.4946289 1.3251953.2294922.5029297.8242188.7197266 1.324707.4951172.2035522-.0932617.4230957-.1633301.6518555-.2105713C24.0628662 17 24.2957153 16.9755859 24.5317383 16.9755859c.9267578 0 1.7978516.3603516 2.453125 1.015625.4840088.4836426.8045654 1.0845337.9401855 1.736084C27.9729004 19.9572144 28 20.192688 28 20.4326172c0 .5527344.4477539 1 1 1s1-.4472656 1-1c0-1.4541016-.5683594-2.8232422-1.6010742-3.8554688C27.3662109 15.5439453 25.9926758 14.9755859 24.5317383 14.9755859zM19.7988281 11.4648438c0-2.0947266-1.7041016-3.7988281-3.7988281-3.7988281s-3.7988281 1.7041016-3.7988281 3.7988281S13.9052734 15.2636719 16 15.2636719 19.7988281 13.5595703 19.7988281 11.4648438zM16 9.6660156c.9916992 0 1.7988281.8066406 1.7988281 1.7988281S16.9916992 13.2636719 16 13.2636719s-1.7988281-.8066406-1.7988281-1.7988281S15.0083008 9.6660156 16 9.6660156zM10.3896484 25.0146484c.552063 0 .9996338-.4480591.9998779-1.0004883 0-.0001831.0001221-.0003052.0001221-.0004883 0-2.5419922 2.0683594-4.6103516 4.6103516-4.6103516s4.6103516 2.0683594 4.6103516 4.6103516c0 .0001831.0001221.0003052.0001221.0004883.0002441.5524292.4478149.9995117.9998779.9995117.5522461 0 1-.4472656 1-1 0-3.6445312-2.965332-6.6103516-6.6103516-6.6103516s-6.6103516 2.9658203-6.6103516 6.6113281C9.3896484 24.5673828 9.8374023 25.0146484 10.3896484 25.0146484z"></path>
        </svg>
      ),
      count: 163412,
      cardOneData: {
        labels: [
          "May",
          "April",
          "March",
          "February",
          "January",
          "December",
          "November",
          "October",
          "September",
          "August",
          "July",
          "June",
        ],
        datasets: [
          {
            label: "offer sales",
            data: [
              12323, 15897, 15916, 14687, 15237, 13461, 12504, 13850, 13239,
              10845, 14034, 11419,
            ],
            backgroundColor: "transparent",
            borderColor: "white",
            pointBorderColor: "transparent",
            opacity: "0.5",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      cardOneOptions: {
        plugins: {
          legend: false,
        },
        scales: {
          y: {
            display: false,
          },
          x: {
            display: false,
          },
        },
      },
    },
    {
      backgroundImage:
        "-webkit-linear-gradient(90deg, #11998e 0%, #38ef7d 100%)",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 256 256"
          id="envelope-open"
        >
          <rect width="256" height="256" fill="none"></rect>
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="12"
            d="M224,96V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V96l96-64Z"
          ></path>
          <line
            x1="110.545"
            x2="34.467"
            y1="152"
            y2="205.739"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="12"
          ></line>
          <line
            x1="221.534"
            x2="145.454"
            y1="205.739"
            y2="152"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="12"
          ></line>
          <polyline
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="12"
            points="224 96 145.455 152 110.545 152 32 96"
          ></polyline>
        </svg>
      ),
      count: 163412,
      cardOneData: {
        labels: [
          "May",
          "April",
          "March",
          "February",
          "January",
          "December",
          "November",
          "October",
          "September",
          "August",
          "July",
          "June",
        ],
        datasets: [
          {
            label: "offer sales",
            data: [
              12323, 15897, 15916, 14687, 15237, 13461, 12504, 13850, 13239,
              10845, 14034, 11419,
            ],
            backgroundColor: "transparent",
            borderColor: "white",
            pointBorderColor: "transparent",
            opacity: "0.5",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      cardOneOptions: {
        plugins: {
          legend: false,
        },
        scales: {
          y: {
            display: false,
          },
          x: {
            display: false,
          },
        },
      },
    },
    {
      backgroundImage:
        "-webkit-linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          enable-background="new 0 0 512 512"
          viewBox="0 0 512 512"
          id="envelope"
        >
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="20"
            d="M27.878,115.042c5.583-4.59,12.742-7.335,20.532-7.335H463.59c7.79,0,14.95,2.745,20.532,7.346"
          ></path>
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="20"
            d="M496,140.117v231.766c0,17.893-14.506,32.41-32.41,32.41H48.41c-17.9,0-32.41-14.511-32.41-32.41V140.117
c0-10.114,4.625-19.131,11.878-25.075l215.499,172.878c7.375,5.917,17.871,5.917,25.246,0l215.499-172.867
C491.375,120.986,496,130.003,496,140.117z"
          ></path>
          <line
            x1="195.769"
            x2="27.878"
            y1="249.727"
            y2="396.958"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="20"
          ></line>
          <line
            x1="316.359"
            x2="484.25"
            y1="249.727"
            y2="396.958"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="20"
          ></line>
        </svg>
      ),
      count: 163412,
      cardOneData: {
        labels: [
          "May",
          "April",
          "March",
          "February",
          "January",
          "December",
          "November",
          "October",
          "September",
          "August",
          "July",
          "June",
        ],
        datasets: [
          {
            label: "offer sales",
            data: [
              12323, 15897, 15916, 14687, 15237, 13461, 12504, 13850, 13239,
              10845, 14034, 11419,
            ],
            backgroundColor: "transparent",
            borderColor: "white",
            pointBorderColor: "transparent",
            opacity: "0.5",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      cardOneOptions: {
        plugins: {
          legend: false,
        },
        scales: {
          y: {
            display: false,
          },
          x: {
            display: false,
          },
        },
      },
    },
    {
      backgroundImage:
        "-webkit-linear-gradient(90deg, #45b649 0%, #dce35b 100%)",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 64 64"
          id="gift"
        >
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M44.14 17.16a9.4 9.4 0 0 0 1.13-.68c2.92-2.05 3.82-5.82 2-8.4s-5.66-3-8.58-.93-4.42 5.73-6.05 10zM8.7 30.46H55.31a0 0 0 0 1 0 0v23.7a4 4 0 0 1-4 4H12.7a4 4 0 0 1-4-4V30.46A0 0 0 0 1 8.7 30.46z"
          ></path>
          <rect
            width="11.7"
            height="27.7"
            x="26.15"
            y="30.46"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
          ></rect>
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M19.86,17.16a8.57,8.57,0,0,1-1.12-.68c-2.92-2.05-3.83-5.82-2-8.4s5.66-3,8.59-.93,4.41,5.73,6.05,10Z"
          ></path>
          <rect
            width="51"
            height="13.3"
            x="6.5"
            y="17.16"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            rx="3"
          ></rect>
          <rect
            width="13.83"
            height="13.3"
            x="25.09"
            y="17.16"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
          ></rect>
        </svg>
      ),
      count: 163412,
      cardOneData: {
        labels: [
          "May",
          "April",
          "March",
          "February",
          "January",
          "December",
          "November",
          "October",
          "September",
          "August",
          "July",
          "June",
        ],
        datasets: [
          {
            label: "offer sales",
            data: [
              12323, 15897, 15916, 14687, 15237, 13461, 12504, 13850, 13239,
              10845, 14034, 11419,
            ],
            backgroundColor: "transparent",
            borderColor: "white",
            pointBorderColor: "transparent",
            opacity: "0.5",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      cardOneOptions: {
        plugins: {
          legend: false,
        },
        scales: {
          y: {
            display: false,
          },
          x: {
            display: false,
          },
        },
      },
    },
  ];

  const items = [
    {
      label: <a href="/">India(IN)</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">Japan(JP)</a>,
      key: "1",
    },
    {
      label: "Italy(IT)",
      key: "2",
    },
  ];

  const chartData = {
    labels: [
      "May 2024",
      "",
      "March 2022",
      "",
      "January 2022",
      "",
      "November 2021",
      "",
      "September 2021",
      "",
      "July 2021",
      "",
      "April 2021",
      "",
      "January 2021",
      "",
      "November 2020",
      "",
      "July 2020",
      "",
      "May2020",
      "",
      "",
      "December 2018",
    ],
    datasets: [
      {
        label: "offer sales",
        data: [
          4, 6, 2, 2, 1, 3, 6, 6, 10, 1, 7, 9, 7, 9, 5, 2, 7, 8, 7, 13, 54, 7,
          7, 250,
        ],
        backgroundColor: "aqua",
        borderColor: "brown",
        pointBorderColor: "red",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const campaignData = [
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
    {
      country: "United States",
      totalUsers: 35727,
    },
  ];

  return (
    <DriverWrapper>
      <div>
        <div className="allOfferHeader">
          <h1 className="driverHeading">Dashboard</h1>
        </div>
        <CardWrapper>
          {cardData.map((card, index) => {
            return (
              <CardContainer
                style={{
                  backgroundImage: `${card.backgroundImage}`,
                }}
              >
                <CardHeader>{card.svg}</CardHeader>
                <CardContent>
                  <p style={{ fontSize: "36px", margin: "0" }}>{card.count}</p>
                  <p style={{ fontSize: "18px" }}>Total Users</p>
                </CardContent>
                <div style={{ width: "202px", height:"101px", margin: "auto" }}>
                  <Line data={card.cardOneData} options={card.cardOneOptions} />
                </div>
              </CardContainer>
            );
          })}
        </CardWrapper>
      </div>


      <ChartWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{ textAlign: "start", fontSize: "30px", fontWeight: "500" }}
          >
            Track Offers Chart
          </p>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a
              style={{
                border: "1px solid #000",
                padding: "10px 10px",
                width: "20rem",
                borderRadius: "5px",
              }}
              onClick={(e) => e.preventDefault()}
            >
              <Space
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                Select Geo Code...
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Line data={chartData} options={options}></Line>
      </ChartWrapper>

      <CampaignWrapper>
        <div>
          <p style={{ fontSize: "24px", fontWeight: "400", textAlign: "start" }}>Top Campaigns</p>
          <div style={{ width: "full", height: "0px", border: "1px solid gray", opacity: "0.2" }}></div>
        </div>
        <div>
          <div className="campaign-header">
            <p>Country</p>
            <p>Total Users</p>
          </div>
          {campaignData.map((campaigns, index) => {
            return (
              <>
                <div className="campaign-data">
                  <p>{index + 1}. {campaigns.country}</p>
                  <p>{campaigns.totalUsers}</p>
                </div>
                <div style={{ width: "full", height: "0px", border: "0.5px solid gray", opacity: "0.2" }}></div>
              </>
            );
          })}
        </div>
      </CampaignWrapper>
    </DriverWrapper >
  );
};

export default Dashboard;

const DriverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding-bottom: 35px;
  @media (max-width: 550px) {
    padding-bottom: 25px;
  }
  .allOfferHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      background: ${({ theme }) => theme?.primaryColor};
      padding: 10px 20px;
      margin-right: 10px;
      border: none;
      border-radius: 10px;
      color: ${({ theme }) => theme?.secondaryColor};
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .driverHeading {
    display: flex;
    font-weight: 600;
    font-size: 30px;
    margin: 20px 0px 20px 0px;
    font-family: ${({ theme }) => theme?.fontFamily};
    color: ${({ byTheme }) => (byTheme == "day" ? "#fff" : "#000")};
    @media (max-width: 550px) {
      margin: 0px;
      margin-top: 67px;
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  color: #fff;
`;

const CardHeader = styled.div`
  width: 80%;
  margin: auto;
  text-align: start;
`;

const CardContent = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ChartWrapper = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
`;

const CampaignWrapper = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 16px;
  .campaign-header{
    display: flex;
    justify-content: space-between;
    font-weight:700;
    font-size: 16px;
  }
  .campaign-data {
    display: flex;
    justify-content: space-between;
  }
`;