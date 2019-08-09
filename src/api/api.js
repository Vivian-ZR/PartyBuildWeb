import { post, get } from "./http";

/**
 * api接口统一管理
 */
// 登录退出
export const login = p => post('/user/userLoginCheck', p);
export const logout = () => post('/user/loginLogout');


// 用户中心
export const getUserNews = p => get('/notification/getUserNotificationByUid', p);                       // 用户消息列表
export const getUserlist = p => get('/user/listUser', p);                                               // 用户管理-列表
export const postUserAdd = p => post('/user/saveUser', p);                                              // 用户管理-新增用户
export const postActivation = p => post('/user/directActivateUser', p);                                 // 用户管理-激活用户
export const deleteUser = p => post('/user/deleteUserByids', p);                                        // 删除用户
export const postUserInfo = p => post('/user/updateUser', p);                                           // 修改用户信息
export const getUserDetailed = p => get('/user/getUserById', p);                                        // 获取用户详情页
export const getUserPower = p => get('/PartBuilding/userauthority/', p);                                // 获取用户权限

// 消息
export const postUserNews = p => get('/notification/getUserUnreadNotification', p);                    // 获取用户未读消息

// 新闻
export const getNewsMap = p => get('/carouselnews/searchCarouselNews', p);                              // 获取新闻轮播图
export const getNewsThemeList = p => get('/news/getNewsListForApp', p);                                 // 获取新闻
export const getNewslist = p => get('/news/listNews', p);                                               // 列表
export const deleteNews = p => post('/news/deleteNewsByIds', p);                                        // 删除新闻
export const getNewsDetailed = p => get('/news/getNewsById', p);                                        // 获取新闻详细
export const postAddNews = p => post('/news/saveNews', p);                                              // 添加新闻
export const postUpdateNews = p => post('/news/updateNews', p);                                         // 新闻修改

// 党组织电子信息库
export const getOrglist = p => get('/organization/listOrganization', p);                                // 组织档案列表
export const postAddOrg = p => post('/organization/saveOrganization', p);                               // 添加组织档案
export const deleteOrg = p => post("/organization/deleteOrganizationByids", p);                         // 删除组织
export const getOrganizationBasics = p => get('/organization/getOrganizationById', p);                  // 获取组织档案基础信息
export const postUpdateOrganizationBasics = p => post('/organization/updateOrganization', p);           // 修改组织档案基础信息
export const getOrganizationHonor = p => get('/organizationHonor/listOrganizationHonor', p);            // 获得组织档案荣誉信息
export const postOrganizationHonor = p => post('/organizationHonor/saveOrganizationHonor', p);          // 添加组织档案荣誉信息
export const deleteOrganizationHonor = p => post('/organizationHonor/deleteOrganizationHonorByids', p); // 删除组织档案荣誉信息
export const postUpdateOrganizationHonor = p => post('/organizationHonor/updateOrganizationHonor', p);  // 修改组织档案荣誉信息
export const getOrganizationHonorID = p => get('/organizationHonor/getOrganizationHonorById', p);       // 获得单个组织档案荣誉信息  
export const getOrgPosition = p => get('/organizationPosition/listOrganizationPosition', p);            // 获取组织档案职位信息
export const postAddPosition = p => post('/organizationPosition/saveOrganizationPosition', p);          // 添加组织档案职位信息
export const postUpdateOrgPosition = p => post('/organizationPosition/updateOrganizationPosition', p);  // 修改组织档案职位信息
export const deleteOrgOpsition = p => post('/organizationPosition/deleteOrganizationPositionByids', p); // 删除组织档案职位信息
export const getOrgPositionId = p => get('/organizationPosition/getOrganizationPositionById', p);       // 获得单个组织档案职位信息
export const getOrgDetailed = p => get('/organization/getOrganizationAndAttachmentByIdTwo', p);         // 获得组织详细信息

export const getOrgUserList = p => get('/partyMember/listPartyMember', p);                              // 人员档案列表
export const postSavePartyMember = p => post('/partyMember/savePartyMember', p);                        // 添加党员档案
export const getPartyMember = p => get('/partyMember/getPartyMemberById', p);                           // 获取党员
export const postUpdatePartyMember = p => post('/partyMember/updatePartyMember', p);                    // 修改党员
export const postDeletePartyMember = p => post('/partyMember/deletePartyMemberByids', p);               // 删除党员
export const getMobileList = p => get('/listPartyMemberByFlow', p);                                     // 流动党员列表

export const getOrgPeopleInfo = p => get('/organization/getOrganizationAndAttachmentById', p);          // 获取组织附属信息（人员）
export const getPartyUserList = p => get('/partyMember/getPartyMemberById', p);                         // 模糊查询获取党员列表
export const getPartyIDUserList = p => get('/organization/getPartyMemberByOrganizationId', p);          // 根据组织ID获取党员列表
export const getDocumentCabinet = p => get('/folder/listFolder', p);                                    // 获取文件夹列表  

// 党费
export const getpartylist = p => get('/partyfeemanagement/listPartyFeeManagement', p);

// 会议
export const getmeetinglist = p => get('/meetingpersonel/listMeetingForPersonal', p);                   // 获取当前用户参加的会议列表
export const getmeetingMessageList = p => get('/meeting/listMeetingManageMent', p);                     // 获取会议管理列表
export const postmeetingAdd = p => post('/meeting/saveMeeting', p);                                     // 增加会议
export const deletemeeting = p => post('/meeting/deleteMeetingByIds', p);                               // 删除会议
export const getMeetingDetails = p => get('/meetingpersonel/listMeetingDetail', p);                     // 获取党员详细信息
export const updateModifyMeeting = p => post('/meeting/updateMeeting', p);                              // 修改会议

// 汇报
export const getReportList = p => get('/djThoughtReport/listThoughtReport', p);                         // 汇报列表
export const getMyReportList = p => get('/djThoughtReport/listMyThoughtReport', p);                     // 我的汇报列表    
export const addReportList = p => post('/djThoughtReport/saveThoughtReport', p);                        // 添加汇报
export const getReportDetails = p => get("/djThoughtReport/getThoughtReportById", p);                   // 获取汇报
export const deleteReport = p => post('/djThoughtReport/deleteThoughtReportByIds', p);                  // 删除汇报
export const postReport = p => post('/djThoughtReport/modifyThoughtReport', p);                         // 修改汇报
export const postReportMessage = p => get('/djThoughtReport/listThoughtReportManageMent', p);           // 获得汇报管理列表

// 组织
export const getDemocratic = p => get('/democraticreview/listDemocraticReview', p);                     // 公告列表
export const getDemocraticMessage = p => get('/democraticreview/listDemocraticReviewManageMent', p);    // 公告管理列表获取
export const postDemocratic = p => post('/democraticreview/saveDemocraticReview', p);                   // 新增公告信息
export const deleteDemocratic = p => post('/democraticreview/deleteDemocraticReviewByIds', p);          // 公告删除
export const getDemocraticDetails = p => get('/democraticreview/getDjDemocraticReviewById', p);         // 公告详情
export const getPlanSummary = p => get('/plansummary/listPlanSummary', p);                              // 计划列表
export const getPlanSummaryMessage = p => get('/plansummary/listPlanSummaryManageMent', p);             // 计划管理列表
export const postPlanSummary = p => post('/plansummary/saveDjPlanSummary', p);                          // 新增计划
export const getPlanSummaryDetails = p => get('/plansummary/getPlanSummaryById', p);                    // 计划详情
export const deleteSummary = p => post('/plansummary/deletePlanSummaryByIds', p);                       // 删除计划

// 课程
export const getClass = p => get('/course/listCourse', p);                                              // 获取课程列表
export const getUserClass = p => get('/userClass/listUserClass', p);                                    // 获取用户课程列表
export const getClassDetails = p => get('/course/getCourseById', p);                                    // 获取详细课程
export const getChapter = p => get('/chapter/listChapter', p);                                          // 获取章节
export const postSaveCourse = p => post('/course/saveCourse', p);                                       // 添加课程
export const postUpdateCourse = p => post('/course/updateCourse', p);                                   // 修改课程
export const getClassHour = p => get('/class/listClass', p);                                            // 获得课时
export const collectCourse = p => post('/courseCollection/updateCourseCollection', p);                  // 课时收藏     
export const storeList = p => get('/courseCollection/listCourseCollection', p);                         // 收藏课程列表展示 
export const deleteCourse = p => post('/courseCollection/deleteCourseCollectionByids', p);              // 删除收藏                              
// export const postSaveHour = p => post('')

