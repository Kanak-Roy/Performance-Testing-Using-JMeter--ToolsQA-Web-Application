# 🚀 Performance Testing Using JMeter — ToolsQA Web Application

![Apache JMeter](https://img.shields.io/badge/Apache%20JMeter-5.6.3-D22128?style=for-the-badge&logo=apachejmeter&logoColor=white)
![Test Type](https://img.shields.io/badge/Test%20Type-Load%20%26%20Performance-blue?style=for-the-badge)
![Pass Rate](https://img.shields.io/badge/Requests%20Passed-100%25-brightgreen?style=for-the-badge)
![Protocol](https://img.shields.io/badge/Protocol-HTTPS%20(GET)-orange?style=for-the-badge)

## 📋 Project Overview

This repository contains web performance and load testing suite built with **Apache JMeter 5.6.3**[cite: 1, 3]. The test plan evaluates the availability, responsiveness, and stability of **ToolsQA** (`www.toolsqa.com`) and **DemoQA** (`demoqa.com`) across **13 distinct web pages** under simulated concurrent user load[cite: 1].

Each endpoint is encapsulated within its own **Simple Controller** and validated using dual **Response Assertions** to ensure every HTTP request returns a valid `200 OK` response[cite: 1].

---

## ⚙️ Test Plan Configuration

| Parameter | Configuration / Value |
| :--- | :--- |
| **Test Plan File** | `Toolsqa_weburl.jmx`[cite: 2, 3] |
| **JMeter Version** | Apache JMeter 5.6.3[cite: 1, 3] |
| **Target Domains** | `https://www.toolsqa.com`, `https://demoqa.com`[cite: 1] |
| **Number of Threads (Users)** | `10` Virtual Users[cite: 1] |
| **Ramp-Up Period** | `5` Seconds (2 users/second)[cite: 1] |
| **Loop Count** | `1` Iteration per user[cite: 1] |
| **Total Samplers / Endpoints** | `13` HTTP `GET` Requests[cite: 1] |
| **Total Requests Executed** | `130` Samples (`10 users × 13 pages`)[cite: 1] |
| **Error Handling** | Continue on Sample Error[cite: 1] |

---

## 🧪 Endpoints & Controllers Covered

All 13 endpoints are organized into modular **Generic (Simple) Controllers** and verified with two assertions: **Verify status code `200`** and **Verify status message `OK`**[cite: 1]:

| # | Controller / Page Name | Method | Domain | Endpoint Path |
| :-: | :--- | :---: | :--- | :--- |
| 1 | **Home page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/`[cite: 1] |
| 2 | **Selenium Training page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/selenium-training?q=headers`[cite: 1] |
| 3 | **Playground page**[cite: 1] | `GET`[cite: 1] | `demoqa.com`[cite: 1] | `/`[cite: 1] |
| 4 | **About page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/about`[cite: 1] |
| 5 | **Selenium page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/selenium-webdriver/selenium-tutorial/`[cite: 1] |
| 6 | **Cucumber page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/cucumber-tutorial/`[cite: 1] |
| 7 | **Rest Assured page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/rest-assured-tutorial/`[cite: 1] |
| 8 | **ISTQB page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/software-testing/istqb-foundation-level/`[cite: 1] |
| 9 | **Postman page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/postman/postman-tutorial/`[cite: 1] |
| 10 | **Git page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/git/git-tutorial/`[cite: 1] |
| 11 | **TestNG page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/testng/testng-tutorial/`[cite: 1] |
| 12 | **Cypress page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/cypress-tutorial/`[cite: 1] |
| 13 | **Python page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/python-tutorial/`[cite: 1] |
| 14 | **Scrum page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/agile/agile-scrum-tutorial/`[cite: 1] |
| 15 | **Enroll Yourself page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/selenium-training?q=banner#enroll-form`[cite: 1] |
| 16 | **Read More page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/selenium-training?q=banner`[cite: 1] |
| 17 | **Tutorials page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/categories`[cite: 1] |
| 18 | **Test Project page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/testproject-tutorial`[cite: 1] |
| 19 | **Software Testing page**[cite: 1] | `GET`[cite: 1] | `www.toolsqa.com`[cite: 1] | `/software-testing/software-testing-tutorial/`[cite: 1] |

*(All 19 HTTP Request Samplers executed cleanly across 10 concurrent threads = **190 total requests**.)*[cite: 1]

---

## 📊 Performance Test Results & APDEX Summary

* **Source File:** `Toolsqa_weburl.jtl`
* **Execution Window:** `11/15/26 7:05 PM` – `11/15/26 7:06 PM`[cite: 2, 4]
* **Requests Summary:** **100% PASS** (`0%` Error Rate)[cite: 4]
* **Overall APDEX Score:** **`0.666`** (Toleration Threshold `T`: `500 ms` | Frustration Threshold `F`: `1 sec 500 ms`)[cite: 4]

### APDEX Breakdown by Page

| Sampler / Page Label | APDEX Score | Toleration (`T`) | Frustration (`F`) | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Total (Overall)**[cite: 4] | **0.666**[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ 100% PASS[cite: 4] |
| **About page**[cite: 4] | 0.900[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Tutorials page**[cite: 4] | 0.900[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Selenium Training page**[cite: 4] | 0.800[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Enroll Yourself page**[cite: 4] | 0.750[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Read More page**[cite: 4] | 0.750[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Home page**[cite: 4] | 0.700[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Test Project page**[cite: 4] | 0.700[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **ISTQB page**[cite: 4] | 0.700[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Rest Assured page**[cite: 4] | 0.700[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Software Testing page**[cite: 4] | 0.700[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **TestNG page**[cite: 4] | 0.650[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Python page**[cite: 4] | 0.600[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Scrum page**[cite: 4] | 0.600[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Cucumber page**[cite: 4] | 0.600[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Git page**[cite: 4] | 0.550[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Cypress page**[cite: 4] | 0.550[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Selenium page**[cite: 4] | 0.550[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Postman page**[cite: 4] | 0.500[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |
| **Playground page**[cite: 4] | 0.450[cite: 4] | 500 ms[cite: 4] | 1500 ms[cite: 4] | ✅ PASS[cite: 4] |

---

## 🖼️ Visuals & Reports

### 1. Apache JMeter Test Plan Interface
![JMeter Test Plan Interface](Screenshots/jmeter-interface.png)

### 2. HTML Performance Dashboard Report
![Apache JMeter HTML Dashboard Report](Screenshots/performance-dashboard.png)

---

## 🚀 How to Run This Test Plan (CLI Mode)

Running JMeter in **Non-GUI (CLI) mode** is recommended for accurate performance testing and HTML report generation.

### Prerequisites
* **Java (JDK 8 or higher)** installed and configured in `PATH`
* **Apache JMeter 5.6.3** installed and added to system environment variables[cite: 1, 3]

### Step-by-Step Execution Commands

1. **General Command Syntax:**
   ```bash
   jmeter -n -t filename.jmx -l filename.jtl
   jmeter -g filename.jtl -o filename.html