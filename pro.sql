/*
Navicat MySQL Data Transfer

Source Server         : project
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : pro

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2016-11-20 21:35:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `circles`
-- ----------------------------
DROP TABLE IF EXISTS `circles`;
CREATE TABLE `circles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '圈子编号',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `name` varchar(100) NOT NULL COMMENT '圈子名称',
  `dynamic` tinyint(2) NOT NULL DEFAULT '2' COMMENT '首页讯息串中的讯息数量。0没有1减少2标准3更多',
  `notice` tinyint(2) NOT NULL DEFAULT '1' COMMENT '是否获取有关新信息的通知。1获取0不获取',
  `follownum` int(10) unsigned NOT NULL COMMENT '圈子内的用户数量',
  `followid` text COMMENT '圈子内的用户编号列表，逗号分隔',
  `addtime` int(10) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of circles
-- ----------------------------

-- ----------------------------
-- Table structure for `collections`
-- ----------------------------
DROP TABLE IF EXISTS `collections`;
CREATE TABLE `collections` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '收藏集编号',
  `title` varchar(100) NOT NULL COMMENT '收藏集标题',
  `slogan` varchar(500) DEFAULT NULL COMMENT '收藏集标语',
  `addtime` int(10) unsigned NOT NULL COMMENT '创建时间',
  `userid` int(11) NOT NULL COMMENT '所属用户编号',
  `circleid` varchar(500) DEFAULT NULL COMMENT '有权查看的圈子编号列表，逗号分隔',
  `peopleid` varchar(500) DEFAULT NULL COMMENT '有权查看的用户编号列表，逗号分隔',
  `hide` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否仅自己可见。1仅自己可见',
  `fansnum` int(11) NOT NULL DEFAULT '0' COMMENT '粉丝数量',
  `fans` text COMMENT '粉丝编号列表，逗号分隔',
  `postnum` int(11) NOT NULL DEFAULT '0' COMMENT '收藏集内帖子数量',
  `picid` int(11) DEFAULT '1' COMMENT '收藏集图片编号',
  `background` varchar(100) NOT NULL COMMENT '收藏集背景色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collections
-- ----------------------------
INSERT INTO `collections` VALUES ('1', '哈哈哈哈哈哈哈哈哈哈哈1', '你笑啥213', '1479533671', '1', null, null, '0', '1', '', '0', '1', '#00ABC0');
INSERT INTO `collections` VALUES ('2', '哈哈哈哈2', '你笑啥213', '1478693390', '2', null, null, '0', '2', '8,', '0', '2', '#EB3F79');
INSERT INTO `collections` VALUES ('3', '哈哈哈哈3', '你笑啥213', '1478693390', '3', null, null, '0', '1', '8,', '0', '3', '#E53935');
INSERT INTO `collections` VALUES ('4', '哈哈哈哈', null, '1478693390', '3', null, null, '0', '0', '', '0', '4', '#A900FF');
INSERT INTO `collections` VALUES ('5', '哈哈哈哈44', null, '1478693390', '5', null, null, '0', '0', '', '0', '1', '#00ABC0');
INSERT INTO `collections` VALUES ('6', '哈哈哈哈fd', null, '1478693390', '6', null, null, '0', '0', null, '0', '2', '#1D87E4');
INSERT INTO `collections` VALUES ('7', '哈哈哈哈', '你笑啥213', '1478693390', '1', null, null, '0', '0', null, '0', '3', '#7D56C1');
INSERT INTO `collections` VALUES ('8', '哈哈哈哈', null, '1478693390', '4', null, null, '0', '0', '', '0', '1', '#00ABC0');
INSERT INTO `collections` VALUES ('9', '哈哈哈哈', '你笑啥213', '1478693390', '2', null, null, '0', '0', null, '0', '2', '#7D56C1');
INSERT INTO `collections` VALUES ('10', '哈哈哈哈dffe', null, '1478693390', '5', null, null, '0', '0', null, '0', '3', '#EB3F79');
INSERT INTO `collections` VALUES ('11', '哈哈哈哈', null, '1478693390', '6', null, null, '0', '0', '', '0', '4', '#00ABC0');
INSERT INTO `collections` VALUES ('12', '哈哈哈哈', '你笑啥213', '1478693390', '3', null, null, '0', '0', '', '0', '1', '#7D56C1');
INSERT INTO `collections` VALUES ('13', '哈哈哈哈', null, '1478693390', '2', null, null, '0', '0', null, '0', '4', '#1D87E4');
INSERT INTO `collections` VALUES ('14', '哈哈哈哈', null, '1478693390', '3', null, null, '0', '0', null, '0', '5', '#00ABC0');
INSERT INTO `collections` VALUES ('15', '哈哈哈哈', null, '1478693390', '3', null, null, '0', '0', null, '0', '3', '#7D56C1');
INSERT INTO `collections` VALUES ('16', '哈哈哈哈', null, '1478693390', '1', null, null, '0', '0', null, '0', '4', '#00ABC0');
INSERT INTO `collections` VALUES ('17', '哈哈哈哈', null, '1478693390', '4', null, null, '0', '0', null, '0', '6', '#1D87E4');
INSERT INTO `collections` VALUES ('18', '哈哈哈哈', null, '1478693390', '5', null, null, '0', '0', null, '0', '3', '#029AE4');
INSERT INTO `collections` VALUES ('19', '哈哈哈哈', null, '1478693390', '1', null, null, '0', '0', null, '0', '2', '#029AE4');
INSERT INTO `collections` VALUES ('20', '哈哈哈哈', null, '1478693390', '3', null, null, '0', '0', null, '0', '3', '#00ABC0');
INSERT INTO `collections` VALUES ('21', '哈哈哈哈', null, '1478693390', '2', null, null, '0', '0', null, '0', '3', '#00ABC0');
INSERT INTO `collections` VALUES ('22', '哈哈哈哈', null, '1478693390', '5', null, null, '0', '0', null, '0', '6', '#00887A');
INSERT INTO `collections` VALUES ('23', '哈哈哈哈', null, '1478693390', '3', null, null, '0', '0', null, '0', '4', '#679E37');
INSERT INTO `collections` VALUES ('24', '哈哈哈哈', null, '1478693390', '3', null, null, '0', '0', null, '0', '5', '#00887A');
INSERT INTO `collections` VALUES ('26', '第二个', '哈哈13', '1479640840', '8', null, null, '0', '1', '8,', '0', '1', '#FF6F42');
INSERT INTO `collections` VALUES ('28', 'oiu0000', '98765', '1479634083', '8', null, null, '0', '0', '', '0', '19', '#EB3F79');
INSERT INTO `collections` VALUES ('34', '你们好', '谢谢啊', '1479542414', '8', null, null, '0', '0', null, '0', '23', '#00ABC0');
INSERT INTO `collections` VALUES ('35', '0000000', '0909090990990909', '1479542560', '8', null, null, '0', '0', null, '0', '1', '#00ABC0');

-- ----------------------------
-- Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论编号',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `postid` int(10) unsigned NOT NULL COMMENT '所属帖子编号',
  `content` text COMMENT '评论内容',
  `picid` int(11) DEFAULT NULL COMMENT '图片编号',
  `linkid` int(11) DEFAULT NULL COMMENT '链接编号',
  `likes` int(11) NOT NULL DEFAULT '0' COMMENT '喜欢的数量',
  `likeuserid` text COMMENT '喜欢的用户编号列表，逗号分隔',
  `parentid` int(11) NOT NULL DEFAULT '0' COMMENT '父级评论编号',
  `path` varchar(255) NOT NULL DEFAULT '0' COMMENT '父级编号层级拼接',
  `addtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '1', '1', '虽然各色各', '1', '1', '1', '1', '1', '1,', '11152333');
INSERT INTO `comments` VALUES ('2', '2', '2', '三个太过挑剔', '2', '2', '2', '2', '2', '2,', '34234234');
INSERT INTO `comments` VALUES ('3', '3', '3', '嘎如果', '3', '3', '3', '3', '3', '3,', '234234');
INSERT INTO `comments` VALUES ('4', '4', '4', '公司各色各', '4', '4', '4', '4', '4', '4,', '4353453');

-- ----------------------------
-- Table structure for `commoption`
-- ----------------------------
DROP TABLE IF EXISTS `commoption`;
CREATE TABLE `commoption` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '类别编号',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `commid` int(11) DEFAULT NULL COMMENT '所属社区编号',
  `dynamic` tinyint(4) NOT NULL DEFAULT '2' COMMENT '首页讯息串中的讯息数量。0没有1减少2标准3更多',
  `sort` tinyint(4) NOT NULL DEFAULT '1' COMMENT '帖子排序方式1热门2新帖',
  `notice` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否获取有关新信息的通知。1获取0不获取',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commoption
-- ----------------------------

-- ----------------------------
-- Table structure for `commtypes`
-- ----------------------------
DROP TABLE IF EXISTS `commtypes`;
CREATE TABLE `commtypes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '类别编号',
  `commid` int(11) DEFAULT NULL COMMENT '所属社区编号',
  `name` varchar(100) NOT NULL COMMENT '类别名称',
  `parentid` int(11) NOT NULL DEFAULT '0' COMMENT '父级类别编号',
  `path` varchar(300) NOT NULL DEFAULT '0,' COMMENT '父级编号层级拼接',
  `addtime` int(11) NOT NULL,
  `postnum` int(11) NOT NULL DEFAULT '0' COMMENT '类别内帖子数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commtypes
-- ----------------------------
INSERT INTO `commtypes` VALUES ('1', '1', 'ZsCffC', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('2', '2', 'UOzbOc', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('3', '3', 'nRay80', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('5', '5', 'yNkjix', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('6', '6', 'MuaveU', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('7', '7', 'BClZ1A', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('8', '8', 'vrOHDw', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('9', '9', 'sczEVk', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('10', '10', '2Sam5s', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('11', '11', 'iKVYbe', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('12', '12', 'opYkNL', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('13', '13', '7TZYft', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('14', '14', 'dJtUv4', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('15', '15', 'PW9gNs', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('16', '16', 'ipoxal', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('17', '17', 'Wf82uQ', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('18', '18', 'DCwZKe', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('19', '19', 'Pvh8Zc', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('20', '20', 'ZeBx6c', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('21', '21', 'ZgiaF6', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('22', '22', 'pGtc2T', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('23', '23', 'jnt1m1', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('24', '24', 'sIOeO9', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('25', '25', 'I3KYio', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('26', '26', '3nMSxn', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('27', '27', 'mn8fwF', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('28', '28', '2qFeK5', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('29', '29', 'ttRfkE', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('30', '30', 'hSQ9AZ', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('31', '31', 'Ni8cNS', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('32', '32', 'arQZrG', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('33', '33', 'yH9laR', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('34', '34', 'oVsVZ1', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('35', '35', 'W4xUkb', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('36', '36', 'xjQG5H', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('37', '37', 'ei5ZAj', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('38', '38', 'zKBZxO', '0', '0,', '1478693351', '0');
INSERT INTO `commtypes` VALUES ('39', '39', 'v6t7Lv', '0', '0,', '1478693351', '0');

-- ----------------------------
-- Table structure for `communities`
-- ----------------------------
DROP TABLE IF EXISTS `communities`;
CREATE TABLE `communities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '社区编号',
  `title` varchar(100) NOT NULL COMMENT '社区标题',
  `slogan` varchar(500) DEFAULT NULL COMMENT '社区标语',
  `addtime` int(11) NOT NULL COMMENT '创建时间',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `hide` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否仅自己可见。1仅自己可见',
  `examineuser` text COMMENT '需要审核的会员加入请求列表，逗号分隔',
  `search` tinyint(4) NOT NULL DEFAULT '1' COMMENT '不可见时允许搜索社区并加入。1允许0禁止',
  `admins` varchar(200) DEFAULT NULL COMMENT '社区管理员编号列表，逗号分隔',
  `examinepost` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否开启新帖审核。1审核0不审核',
  `membernum` int(11) NOT NULL DEFAULT '0' COMMENT '成员数量',
  `members` text COMMENT '成员编号列表，逗号分隔',
  `invitation` varchar(500) DEFAULT NULL COMMENT '想邀请的加入的用户编号列表，逗号分隔',
  `picid` int(11) DEFAULT '1' COMMENT '社区图片编号',
  `describe` text COMMENT '社区描述',
  `linkid` varchar(500) DEFAULT NULL COMMENT '链接编号列表，逗号分隔',
  `typeid` varchar(300) DEFAULT NULL COMMENT '类别编号列表，逗号分隔',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of communities
-- ----------------------------
INSERT INTO `communities` VALUES ('1', '呵呵呵呵呵呵', '小小小西欧爱心哦', '1231231231', '8', '0', null, '1', '100,1,2,3', '0', '0', '', null, '1', null, null, '2');
INSERT INTO `communities` VALUES ('2', '嘿嘿嘿额', '嘿嘿嘿额黑', '123123123', '1', '0', null, '1', '2,3', '0', '1', '8,', null, '2', null, null, null);
INSERT INTO `communities` VALUES ('3', '嘿嘿嘿额1', '嘿嘿嘿额黑', '123123123', '3', '0', null, '1', '1,3', '0', '0', '', null, '3', null, null, null);
INSERT INTO `communities` VALUES ('4', '嘿嘿嘿额黑3', '嘿嘿嘿额黑', '123123123', '4', '0', null, '1', null, '0', '0', '', null, '4', null, null, null);
INSERT INTO `communities` VALUES ('5', '嘿嘿嘿额黑4', '嘿嘿嘿额黑', '123123123', '5', '0', null, '1', null, '0', '0', null, null, '5', null, null, null);
INSERT INTO `communities` VALUES ('6', '1231231', '嘿嘿嘿额黑', '123123123', '6', '0', null, '1', null, '0', '0', '', null, '6', null, null, null);
INSERT INTO `communities` VALUES ('7', 'sadasd', '嘿嘿嘿额黑', '123123123', '1', '0', null, '1', null, '0', '0', '', null, '7', null, null, null);
INSERT INTO `communities` VALUES ('8', '嘿嘿122', '嘿嘿嘿额黑', '123123123', '3', '0', null, '1', null, '0', '0', null, null, '8', null, null, null);
INSERT INTO `communities` VALUES ('9', '嘿嘿trew', '嘿嘿嘿额黑', '123123123', '2', '0', null, '1', null, '0', '0', null, null, '9', null, null, null);
INSERT INTO `communities` VALUES ('10', '嘿嘿jhgf', '嘿嘿嘿额黑', '123123123', '4', '0', null, '1', null, '0', '0', null, null, '10', null, null, null);
INSERT INTO `communities` VALUES ('11', '嘿嘿嘿ooo', '嘿嘿嘿额黑', '123123123', '5', '0', null, '1', null, '0', '0', '', null, '11', null, null, null);
INSERT INTO `communities` VALUES ('12', '123', '1233211', '1479643883', '8', '0', null, '1', null, '0', '0', null, null, '1', null, null, null);

-- ----------------------------
-- Table structure for `files`
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文件编号',
  `name` varchar(100) DEFAULT NULL COMMENT '文件名',
  `extension` varchar(100) DEFAULT NULL COMMENT '文件扩展名',
  `userid` int(11) NOT NULL COMMENT '所属用户编号',
  `path` varchar(300) DEFAULT NULL COMMENT '文件保存路径',
  `state` tinyint(2) NOT NULL DEFAULT '1' COMMENT '文件状态。1正常0回收站',
  `addtime` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of files
-- ----------------------------
INSERT INTO `files` VALUES ('1', '1', '', '1', '/images/1479536123htKmLH.jpg', '1', '2343354');
INSERT INTO `files` VALUES ('2', '2', null, '2', '/images/2.jpg', '1', '3423');
INSERT INTO `files` VALUES ('3', '3', null, '4', '/images/3.jpg', '1', '32432423');
INSERT INTO `files` VALUES ('4', '4', null, '5', '/images/5.jpg', '1', '43545');
INSERT INTO `files` VALUES ('5', '5', null, '6', '/images/6.jpg', '1', '345465');
INSERT INTO `files` VALUES ('6', null, null, '7', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('7', null, null, '8', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('8', null, null, '9', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('9', null, null, '8', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('10', null, null, '1', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('11', null, null, '2', '/images/1.jpg', '1', null);
INSERT INTO `files` VALUES ('12', null, null, '8', '/images/1479456790QaBi9z.jpg', '1', null);
INSERT INTO `files` VALUES ('13', null, null, '8', '/images/1479456925hfYmgg.jpg', '1', null);
INSERT INTO `files` VALUES ('14', null, null, '8', '/images/14794582348sHPBA.jpg', '1', null);
INSERT INTO `files` VALUES ('15', null, null, '8', '/images/1479458405nsNxI5.jpg', '1', null);
INSERT INTO `files` VALUES ('16', null, null, '8', '/images/1479458472A07OBA.jpg', '1', null);
INSERT INTO `files` VALUES ('17', null, null, '8', '/images/1479458728xLa6rV.jpg', '1', null);
INSERT INTO `files` VALUES ('18', null, null, '8', '/images/1479459454NY2lfW.jpg', '1', null);
INSERT INTO `files` VALUES ('19', null, null, '8', '/images/14795362140NYsKk.jpg', '1', null);
INSERT INTO `files` VALUES ('20', null, null, '8', '/images/1479460353v2KcVz.jpg', '1', null);
INSERT INTO `files` VALUES ('21', null, null, '8', '/images/1479466379LP4dbd.jpg', '1', null);
INSERT INTO `files` VALUES ('22', null, null, '8', '/images/1479536072kwS6SC.jpg', '1', null);
INSERT INTO `files` VALUES ('23', null, null, '8', '/images/1479542413fv0s8m.jpg', '1', null);

-- ----------------------------
-- Table structure for `links`
-- ----------------------------
DROP TABLE IF EXISTS `links`;
CREATE TABLE `links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '链接编号',
  `name` varchar(100) NOT NULL COMMENT '网站名称',
  `url` varchar(300) NOT NULL COMMENT '网站网址',
  `picture` varchar(300) DEFAULT NULL COMMENT '图片保存路径',
  `addtime` int(10) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of links
-- ----------------------------

-- ----------------------------
-- Table structure for `notice`
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(10) unsigned NOT NULL COMMENT '通知编号',
  `userid` int(11) NOT NULL COMMENT '所属用户编号',
  `addtime` int(11) NOT NULL,
  `launchuser` int(11) NOT NULL COMMENT '发起的用户编号',
  `postid` int(11) NOT NULL COMMENT '帖子编号',
  `commentid` int(11) NOT NULL COMMENT '评论编号',
  `vateid` int(11) NOT NULL COMMENT '投票编号',
  `collid` int(11) NOT NULL COMMENT '收藏集编号',
  `commid` int(11) NOT NULL COMMENT '社区编号',
  `type` varchar(255) DEFAULT NULL COMMENT '事件类型',
  `explain` text COMMENT '事件说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------

-- ----------------------------
-- Table structure for `posts`
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '帖子编号',
  `title` varchar(100) DEFAULT NULL COMMENT '帖子标题',
  `abstract` varchar(500) DEFAULT NULL COMMENT '帖子摘要',
  `content` text COMMENT '帖子内容',
  `addtime` int(10) unsigned NOT NULL COMMENT '添加时间',
  `userid` int(10) unsigned NOT NULL COMMENT '所属用户编号',
  `type` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '帖子类型。1文字2图片3链接4投票5文章',
  `picid` varchar(500) DEFAULT NULL COMMENT '图片编号列表，逗号分隔',
  `fileid` varchar(300) DEFAULT NULL COMMENT '附件编号列表，逗号分隔',
  `linkid` varchar(300) DEFAULT NULL COMMENT '链接编号列表，逗号分隔',
  `voteid` varchar(500) DEFAULT NULL COMMENT '投票编号列表，逗号分隔',
  `collid` int(10) unsigned DEFAULT NULL COMMENT '所属收藏集编号',
  `commid` int(11) DEFAULT NULL COMMENT '所属社区编号',
  `commtypeid` int(11) DEFAULT NULL COMMENT '所属社区类别编号',
  `circleid` varchar(500) DEFAULT NULL COMMENT '有权查看的圈子编号列表，逗号分隔',
  `peopleid` varchar(500) DEFAULT NULL COMMENT '有权查看的用户编号列表，逗号分隔',
  `comments` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '评论的数量',
  `nocomment` tinyint(2) NOT NULL DEFAULT '1' COMMENT '禁止评论 1允许 0禁止',
  `noshare` tinyint(2) NOT NULL DEFAULT '1' COMMENT '禁止分享 1允许 0禁止',
  `likes` int(11) NOT NULL DEFAULT '0' COMMENT '喜欢的数量',
  `likeuserid` text COMMENT '喜欢的用户编号列表，逗号分隔',
  `shares` int(11) NOT NULL DEFAULT '0' COMMENT '分享的数量',
  `fixed` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否固定到顶部 1固定 0禁',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '帖子状态。1正常0回收站2待审核',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('1', '风景风景1', null, null, '1478696390', '1', '1', '1', null, null, null, '1', '7', null, null, null, '0', '1', '1', '0', '', '0', '0', '1');
INSERT INTO `posts` VALUES ('2', '风景风景2', null, null, '1478696390', '1', '1', '2', null, null, null, '1', '1', null, null, null, '0', '1', '1', '0', '', '0', '0', '1');
INSERT INTO `posts` VALUES ('3', '风景风景3', null, null, '1478696390', '1', '1', '3', null, null, null, '26', '1', null, null, null, '0', '1', '1', '1', '8', '0', '0', '1');
INSERT INTO `posts` VALUES ('4', '风景风景4', null, null, '1478696390', '1', '1', '4', null, null, null, '1', '8', null, null, null, '0', '1', '1', '0', '', '0', '0', '1');
INSERT INTO `posts` VALUES ('5', '风景风景5', null, null, '1478696390', '1', '1', '1', null, null, null, '1', '6', null, null, null, '0', '1', '1', '0', '', '0', '0', '1');
INSERT INTO `posts` VALUES ('6', '风景风景6', null, null, '1478696390', '1', '1', '1', null, null, null, '26', '6', null, null, null, '0', '1', '1', '0', '', '0', '0', '1');
INSERT INTO `posts` VALUES ('7', '忽而和任何', null, '符合人飞速热敷', '10161113', '2', '2', '2', '2', '2', '2', '2', '2', null, '2', '2', '0', '1', '1', '3', '2,8', '2', '2', '0');
INSERT INTO `posts` VALUES ('8', '按错太过投入嘎然提供', null, '我耳根软榻上改善人体', '11111111', '3', '3', '3', '3', '3', '3', '3', '33', '3', '3', '3', '0', '1', '1', '3', '3', '3', '1', '1');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `username` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `phone` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `state` tinyint(2) NOT NULL DEFAULT '1' COMMENT '用户状态。0禁用、1未激活2正常3管理员',
  `picid` int(11) DEFAULT NULL COMMENT '头像图片编号',
  `sex` tinyint(2) NOT NULL DEFAULT '0' COMMENT '性别。0保密1男2女',
  `shield` text COMMENT '被屏蔽的用户编号列表，逗号分隔',
  `ignore` text COMMENT '被忽略的用户编号列表，逗号分隔',
  `followusers` text COMMENT '关注的用户编号列表，逗号分隔',
  `dynamic` tinyint(4) NOT NULL DEFAULT '2' COMMENT '首页讯息串中的讯息数量。0没有1减少2标准3更多',
  `notice` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否获取有关新信息的通知。1获取0不获取',
  `followcoll` text COMMENT '关注的合集编号列表，逗号分隔',
  `followcomm` text COMMENT '关注的社区编号列表，逗号分隔',
  `circle` text COMMENT '我的圈子编号列表，逗号分隔',
  `postnum` int(11) NOT NULL DEFAULT '0' COMMENT '用户发表的帖子数量',
  `background` int(11) DEFAULT NULL COMMENT '背景图片编号',
  `slogan` varchar(500) DEFAULT NULL COMMENT '用户个性宣言',
  `showcoll` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否公开你关注的收藏集 1显示0隐藏',
  `showcomm` text COMMENT '想公开的你收藏的社区编号列表，逗号分隔',
  `visit` int(11) NOT NULL DEFAULT '0' COMMENT '主页被访问次数',
  `created_at` datetime DEFAULT NULL COMMENT '注册时间',
  `nickname` varchar(100) DEFAULT NULL COMMENT '用户昵称',
  `birthday` int(11) DEFAULT NULL COMMENT '生日时间戳',
  `birth` varchar(100) DEFAULT NULL COMMENT '出生地',
  `residence` varchar(100) DEFAULT NULL COMMENT '居住地',
  `introduce` varchar(500) DEFAULT NULL COMMENT '个人简介',
  `token` varchar(100) NOT NULL COMMENT '令牌。忘记密码验证',
  `remember_token` varchar(100) DEFAULT NULL COMMENT '用于存储“记住我”令牌',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '用户更新时间',
  `fans` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'wangbao', '$2y$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '1105085970@qq.com', '1', '3', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '545', 'IBnZQAmWcrBxEcp05vHqNpA79d802IX30WuGWUKx4o9qcOrZROrl1japrKEQ', '2016-11-19 14:33:51', null);
INSERT INTO `users` VALUES ('2', 'wangbao1', '$2y$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '11050859701@qq.com', '1', '2', '0', null, null, null, '2', '1', '2,', null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '545', 'FUu20lvKudLspJEFuADKOMn1ft8uLntFqWRcegrpTuBroN5NNGJQqHEjYJNj', '2016-11-15 21:07:31', null);
INSERT INTO `users` VALUES ('3', 'peisijia', '$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '1249542668@qq.com', '1', '3', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '444', 'FUu20lvKudLspJEFuADKOMn1ft8uLntFqWRcegrpTuBroN5NNGJQqHEjYJNj', '2016-11-14 15:40:09', null);
INSERT INTO `users` VALUES ('4', 'fafferf', '$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '2414353415@qq.com', '1', '4', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '23424', 'FUu20lvKudLspJEFuADKOMn1ft8uLntFqWRcegrpTuBroN5NNGJQqHEjYJNj', '2016-11-14 19:44:39', null);
INSERT INTO `users` VALUES ('5', 'sgrdg', '$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '2413423@ff.com', '1', '5', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', null, null, null, null, null, null, '555', 'FUu20lvKudLspJEFuADKOMn1ft8uLntFqWRcegrpTuBroN5NNGJQqHEjYJNj', '2016-11-14 19:44:41', null);
INSERT INTO `users` VALUES ('6', 'psjpsjpsj', '$10$xXcRBzoTpwnGgY7KoeZZ/uzFBNwxgp21vppkb5f6CN/skE/dZO5qC', null, '123456789@qq.com', '1', '6', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', '2016-11-13 21:00:24', null, null, null, null, null, '22FMRDeGCW1w70M3pZPxzeCczSlKyP3SnfT9DTDA4Y5QavFWwU', null, '2016-11-14 19:44:47', null);
INSERT INTO `users` VALUES ('7', 'maomao', '$2y$10$wfskfvC00Va7XbxXzK3iruxlHRNUUsTskr5VXTRY.VUbna67IhiEW', null, '1234567@qq.com', '1', '2', '0', null, null, null, '2', '1', null, null, null, '0', null, null, '0', null, '0', '2016-11-13 22:01:00', null, null, null, null, null, 'Vrd4IeRlyw9kpaMqQNmXvBPDOyQfKWSdY33OgOinCinxTnOMDt', 'C5JW1YuS9kNLM1TVeK45QIzKYvGclZNEDgk9vLhhfx8HO9zqB3TepCFVYoJL', '2016-11-16 08:58:02', null);
INSERT INTO `users` VALUES ('8', 'wang', '$2y$10$8zINeDd5GfRH2R97ljHKQ.UUg9OqSthCnFD2ovHPasqBNfyLWGaDu', null, '666@qq.com', '1', '6', '0', null, null, null, '2', '1', '1000,26,33,3,2,', '1000,2,', null, '0', null, null, '0', null, '0', '2016-11-14 14:35:34', null, null, null, null, null, '0RsXhCG4ANs5SpkNkgy9aqhEjpFQiPJ7kddYcgIbVmTMxJTtF8', 'jlhKN4RJV9P18uSCTD7hvbCpGijXlCT2daYfoYQwZRb83fKsUZ9tnJJm99ct', '2016-11-20 19:19:21', null);

-- ----------------------------
-- Table structure for `votes`
-- ----------------------------
DROP TABLE IF EXISTS `votes`;
CREATE TABLE `votes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '投票编号',
  `postid` int(11) NOT NULL COMMENT '所属帖子编号',
  `choice` varchar(100) NOT NULL COMMENT '一个投票选项',
  `picid` int(11) DEFAULT NULL COMMENT '选项图片编',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '票数',
  `userid` text COMMENT '投过该项的用户编号列表，逗号分隔',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of votes
-- ----------------------------
