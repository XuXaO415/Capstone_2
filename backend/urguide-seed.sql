
INSERT INTO users (first_name, last_name, username, password, email, phone, city, country, zipCode, latitude, longitude, image_url, hobbies, interests, is_admin)
VALUES ('test', 'user', 'testuser', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'testuser@email.com', 1234567890, 'testcity', 'testcountry', 12345, 12345, 12345, 'testimageurl', 'testhobbies', 'please work', FALSE),
('Admin', 'Boss', 'adminisdaboss', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'admin@email.com', 1234567890, 'testcity', 'testcountry', 12345, 12345, 12345, 'testimageurl', 'testhobbies', 'please work', TRUE);







INSERT INTO guide (user_id, is_guide)
VALUES(1, TRUE),
(2, TRUE),
(3, TRUE),
(4, TRUE),
(5, TRUE);


INSERT INTO tourist (user_id, is_tourist)
VALUES(1, TRUE),
(2, TRUE),
(3, TRUE),
(4, TRUE),
(5, TRUE);

INSERT INTO user_guide (user_id, guide_id)
VALUES(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO user_tourist (user_id, tourist_id)
VALUES(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO guide_tourist (guide_id, tourist_id)
VALUES(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO user_type (user_id, type)
VALUES(1, 'tourist'),
(2, 'guide'),
(3, 'tourist'),
(4, 'guide'),
(5, 'tourist');

INSERT INTO guide_type (guide_id, type)
VALUES(1, 'tourist'),
(2, 'guide'),
(3, 'tourist'),
(4, 'guide'),
(5, 'tourist');

INSERT INTO user_interest (user_id, interest)
VALUES(1, 'travel'),
(2, 'hiking'),
(3, 'sightseeing'),
(4, 'food'),
(5, 'shopping');


INSERT INTO user_languages (user_id, language)
VALUES(1, 'English'),
(2, 'Spanish'),
(3, 'French'),
(4, 'Japanese'),
(5, 'Italian');


INSERT  INTO user_locations (user_id, location)
VALUES(1, 'San Francisco'),
(2, 'Paris'),
(3, 'London'),
(4, 'Tokyo'),
(5, 'Rome');

INSERT INTO user_likes (user_id, liked_user_id)
VALUES(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 1);

INSERT INTO user_dislikes (user_id, disliked_user_id)
VALUES(2, 4),
(3, 5),
(4, 1),
(5, 2),
(1, 3);

INSERT INTO user_distance (user_id, distance)
VALUES(1, 10),
(2, 20),
(3, 30),
(4, 40),
(5, 50);

INSERT INTO ratings (tourist_id, guide_id, rating)
VALUES(1, 2, 5),
(2, 3, 4),
(3, 4, 3),
(4, 5, 1),
(5, 1, 5);



-- INSERT INTO user_rating (user_id, rating)
-- VALUES(1, 5),
-- (2, 4),
-- (3, 3),
-- (4, 1),
-- (5, 5);

-- INSERT INTO guide_ratings (tourist_id, guide_id, rating)
-- VALUES(1, 4, 4),
-- (3, 2, 3),
-- (4, 1, 5),
-- (5, 3, 2),
-- (2, 5, 1);















-- INSERT INTO users (first_name, last_name, username, password, email, phone, city, country, zipCode, latitude, longitude, image_url, hobbies, interests)
-- VALUES('Brett', 'Ciccotto', 'bciccotto', 'd9QZ2TfjzBF', 'bciccotto1@home.pl', 862644221629, 'Liangshan', 'China', NULL, 27.88157, 102.267712, 'https://robohash.org/beataesitharum.jpg?size=50x50&set=set1', 'incubate dot-com e-tailers', 'Multi-lateral attitude-oriented application'),
-- ('Lorenza', 'Barnardo', 'lbarnardo2', 'OzM28cthZbM', 'lbarnardo2@ebay.com', 638095445317, 'Tagbina', 'Philippines', '8308', 8.417766, 126.207415, 'https://robohash.org/assumendaestiste.jpg?size=50x50&set=set1', 'facilitate wireless infrastructures', 'Function-based client-server internet solution'),
-- ('Carolin', 'Brodeur', 'cbrodeur3', 'vlMpXR', 'cbrodeur3@diigo.com', 850654069335, 'Namyang-dong', 'South Korea', NULL, 41.45, 128.833333, 'https://robohash.org/temporequiased.jpg?size=50x50&set=set1', 'transform magnetic content', 'Distributed solution-oriented neural-net'),
-- ('Raeann', 'Labbet', 'rlabbet4', 'JAA6M4o2WL', 'rlabbet4@discovery.com', 3722008245020, 'Jõhvi', 'Estonia', NULL, 59.3573116, 27.4136645, 'https://robohash.org/estnihilquo.jpg?size=50x50&set=set1', 'iterate vertical infomediaries', 'Quality-focused homogeneous help-desk'),
-- ('Kimberly', 'Banaszczyk', 'kbanaszczyk5', 'ksjLMjY', 'kbanaszczyk5@indiatimes.com', 584642084333, 'Barinitas', 'Venezuela', NULL, 8.7548237, -70.401535, 'https://robohash.org/temporibusipsasequi.jpg?size=50x50&set=set1', 'harness compelling e-markets', 'Customizable optimal open architecture'),
-- ('Denys', 'Gotmann', 'dgotmann6', '3ApuEnhuxJBW', 'dgotmann6@howstuffworks.com', 9943461755712, 'Qutqashen', 'Azerbaijan', null, 40.9981633, 47.8699826, 'https://robohash.org/ducimusevenietquo.jpg?size=50x50&set=set1', 'engage granular systems', 'Monitored interactive protocol'),
-- ('Selie', 'Selburn', 'sselburn7', 'X7kUzMJC', 'sselburn7@howstuffworks.com', 635498346196, 'Pan-an', 'Philippines', '7202', 15.2113128, 120.0278872, 'https://robohash.org/doloresdoloresperferendis.jpg?size=50x50&set=set1', 'morph global metrics', 'Triple-buffered bandwidth-monitored throughput'),
-- ('Solly', 'Pearsall', 'spearsall8', 'n63qOH0c2u3', 'spearsall8@altervista.org', 861826068238, 'Chenzhouzhai', 'China', null, 29.260885, 109.735642, 'https://robohash.org/nulladoloreserror.jpg?size=50x50&set=set1', 'envisioneer out-of-the-box e-commerce', 'Re-contextualized local middleware'),
-- ('Filbert', 'Kighly', 'fkighly9', '1LMlyNa0j', 'fkighly9@sfgate.com', 6752301270663, 'Ialibu', 'Papua New Guinea', null, -6.2615781, 143.9813542, 'https://robohash.org/voluptatemsintvoluptatem.jpg?size=50x50&set=set1', 'redefine cross-platform models', 'Multi-channelled demand-driven hierarchy'),
-- ('Bernardo', 'Fisk', 'bfiska', 'WfrLb0suFac', 'bfiska@amazon.co.jp', 512636199289, 'Conchamarca', 'Peru', null, -10.05, -76.166667, 'https://robohash.org/ullameligendisunt.jpg?size=50x50&set=set1', 'incubate dot-com functionalities', 'Quality-focused well-modulated local area network'),
-- ('Nelle', 'Wermerling', 'nwermerlingb', '0Dvr7Dq3uuhV', 'nwermerlingb@guardian.co.uk', 370848136697, 'Panevėžys', 'Lithuania', '38082', 55.7452926, 24.3713362, 'https://robohash.org/omnisfugitdelectus.jpg?size=50x50&set=set1', 'integrate holistic solutions', 'Public-key multimedia contingency'),
-- ('Mehetabel', 'Fardon', 'mfardonc', 'NIHjhjBsSa', 'mfardonc@qq.com', 3582392675404, 'Loimaan Kunta', 'Finland', '32560', 60.955867, 22.6282967, 'https://robohash.org/velitinventoreminima.jpg?size=50x50&set=set1', 'iterate ubiquitous methodologies', 'Multi-tiered foreground hardware'),
-- ('Pen', 'Ollington', 'pollingtond', 'o8mT4G5', 'pollingtond@msn.com', 1307526364, 'Cheyenne', 'United States', '82007', 41.1399814, -104.8202462, 'https://robohash.org/estrationecumque.jpg?size=50x50&set=set1', 'repurpose viral schemas', 'De-engineered 5th generation orchestration'),
-- ('Jorge', 'Sitch', 'jsitche', 'y8tBxM4baES3', 'jsitche@blogger.com', 937608440030, 'Now Zād', 'Afghanistan', null, 32.4000226, 64.4318916, 'https://robohash.org/estoditaperiam.jpg?size=50x50&set=set1', 'scale best-of-breed models', 'Integrated well-modulated migration'),
-- ('Arlen', 'Gillingwater', 'agillingwaterf', 'cKv5ALaN', 'agillingwaterf@wsj.com', 935069708968, 'Khānaqāh', 'Afghanistan', null, 36.62587, 69.53695, 'https://robohash.org/sapienteinnon.jpg?size=50x50&set=set1', 'embrace front-end networks', 'Profit-focused needs-based focus group'),
-- ('Roldan', 'Fussie', 'rfussieg', 'Joj2L9pK6u', 'rfussieg@census.gov', 9768247132834, 'Hüremt', 'Mongolia', null, 48.659828, 102.625198, 'https://robohash.org/noninid.jpg?size=50x50&set=set1', 'deploy extensible technologies', 'Synergized exuding hub'),
-- ('Ethelin', 'Drysdell', 'edrysdellh', '8m4tA17zJjSF', 'edrysdellh@wikispaces.com', 514038733361, 'Nogueira', 'Portugal', '4605410', 41.2757596, -8.1685136, 'https://robohash.org/utestmodi.jpg?size=50x50&set=set1', 'disintermediate interactive action-items', 'Persistent impactful strategy'),
-- ('Selina', 'Acome', 'sacomei', 'WDzGTJJVna', 'sacomei@fema.gov', 2347518253034, 'Zaki Biam', 'Nigeria', null, 7.5005691, 9.6063006, 'https://robohash.org/rationequodconsequatur.jpg?size=50x50&set=set1', 'e-enable enterprise technologies', 'Optimized local strategy'),
-- ('Danny', 'Androsik', 'dandrosikj', 'PTguGTg', 'dandrosikj@dyndns.org', 869766181265, 'Dawu', 'China', null, 30.979545, 101.125237, 'https://robohash.org/nonistedolores.jpg?size=50x50&set=set1', 'scale open-source bandwidth', 'Diverse actuating website'),
-- ('Babs', 'Coleby', 'bcolebyk', '0VhsSf8xgQxj', 'bcolebyk@shareasale.com', 27524174061, 'Bela-Bela', 'South Africa', '0492', -26.7133106, 27.1272547, 'https://robohash.org/aututsint.jpg?size=50x50&set=set1', 'brand best-of-breed systems', 'Programmable stable implementation'),
-- ('Garald', 'Dilke', 'gdilkel', 'xILU3Tb8', 'gdilkel@stumbleupon.com', 5043478298057, 'Guaimaca', 'Honduras', null, 14.549965, -86.8270545, 'https://robohash.org/fugiatmagniconsequuntur.jpg?size=50x50&set=set1', 'evolve extensible portals', 'Intuitive full-range system engine'),
-- ('Hieronymus', 'Gaspar', 'hgasparm', 'xT8VCbm4Ro', 'hgasparm@desdev.cn', 868673740001, 'Jianjun', 'China', null, 36.4406171, 119.2131226, 'https://robohash.org/sitdebitisvoluptate.jpg?size=50x50&set=set1', 'matrix B2B paradigms', 'Cross-group impactful help-desk'),
-- ('Kira', 'Moscrop', 'kmoscropo', 'J3JnS6REY', 'kmoscropo@dailymail.co.uk', 42096773919, 'Starý Bohumín', 'Czech Republic', '73581', 49.9176763, 18.3509727, 'https://robohash.org/molestiaesimiliquevoluptatibus.jpg?size=50x50&set=set1', 'engage wireless platforms', 'Automated systematic success'),
-- ('Bethanne', 'Eglin', 'beglinp', 'PoZZyA', 'beglinp@angelfire.com', 627981190459, 'Sukarame', 'Indonesia', null, -5.3810959, 105.2955575, 'https://robohash.org/etofficiishic.jpg?size=50x50&set=set1', 'aggregate granular vortals', 'Programmable intermediate policy'),
-- ('Obed', 'Lilie', 'olilieq', 'VnnWnqv', 'olilieq@php.net', 79707688294, 'Saraktash', 'Russia', '462159', 51.7920503, 56.3442985, 'https://robohash.org/doloressunttenetur.jpg?size=50x50&set=set1', 'optimize 24/365 channels', 'Cross-platform multi-tasking concept'),
-- ('Sabine', 'Bryden', 'sbrydenr', 'Nlw77p', 'sbrydenr@de.vu', 75861134596, 'Kirovskaya', 'Russia', '353276', 55.5834553, 38.1546279, 'https://robohash.org/etnonea.jpg?size=50x50&set=set1', 'revolutionize 24/365 eyeballs', 'Assimilated client-driven paradigm'),
-- ('Edi', 'Kidder', 'ekidders', '1LWZoTgvK', 'ekidders@thetimes.co.uk', 3705498240412, 'Daugai', 'Lithuania', '64009', 54.36667, 24.33333, 'https://robohash.org/etblanditiisest.jpg?size=50x50&set=set1', 'e-enable compelling infomediaries', 'Exclusive high-level local area network'),
-- ('Michele', 'Patriche', 'mpatrichet', 'oNLw0S', 'mpatrichet@bizjournals.com', 9949889115673, 'Sabirabad', 'Azerbaijan', null, 39.9870663, 48.4692545, 'https://robohash.org/aliquamvelitcorrupti.jpg?size=50x50&set=set1', 'seize rich supply-chains', 'Devolved uniform application'),
-- ('Regen', 'Noods', 'rnoodsu', 'qJhzIjuXYe3', 'rnoodsu@jugem.jp', 865005273180, 'Xiaogang', 'China', null, 31.070643, 113.943274, 'https://robohash.org/earumnonsit.jpg?size=50x50&set=set1', 'revolutionize cross-media bandwidth', 'Total foreground product'),
-- ('Audrey', 'Laidel', 'alaidelv', 'rnhg2PZKQL', 'alaidelv@netscape.com', 866009657983, 'Hekou', 'China', null, 22.529403, 103.93935, 'https://robohash.org/sednamveniam.jpg?size=50x50&set=set1', 'streamline granular systems', 'Proactive multi-tasking implementation'),
-- ('Monroe', 'Yesenev', 'myesenevw', 'KthlNmgB', 'myesenevw@goo.ne.jp', 552547431606, 'Kilimatinde', 'Tanzania', null, -5.8335001, 34.9644426, 'https://robohash.org/delenitinoncum.jpg?size=50x50&set=set1', 'cultivate virtual web-readiness', 'Multi-tiered asynchronous Graphic Interface'),
-- ('Franky', 'Devin', 'fdevinx', 'kxNJC8hjir', 'fdevinx@hc360.com', 862672602564, 'Malin', 'China', null, 61.2323264, 7.1061441, 'https://robohash.org/etsedquia.jpg?size=50x50&set=set1', 'redefine plug-and-play partnerships', 'Quality-focused 24 hour ability'),
-- ('Trixi', 'Gircke', 'tgirckey', 'UIEschUwM', 'tgirckey@wikia.com', 4203748188317, 'Dobřív', 'Czech Republic', '33844', 49.7144884, 13.6861064, 'https://robohash.org/utveritatiset.jpg?size=50x50&set=set1', 'benchmark one-to-one e-commerce', 'Synergized asynchronous approach'),
-- ('Malinda', 'Laverenz', 'mlaverenzz', '4BUQ24MiZ', 'mlaverenzz@toplist.cz', 4205676936507, 'Grygov', 'Czech Republic', '78373', 49.5242389, 17.3082766, 'https://robohash.org/commodiutnon.jpg?size=50x50&set=set1', 'expedite clicks-and-mortar web-readiness', 'Proactive multimedia array'),
-- ('Hermon', 'Grund', 'hgrund10', '7cZkx3g', 'hgrund10@hatena.ne.jp', 3582698065629, 'Leppävirta', 'Finland', '79101', 62.5013857, 27.7904218, 'https://robohash.org/ipsasolutaperspiciatis.jpg?size=50x50&set=set1', 'repurpose frictionless e-services', 'Upgradable full-range function'),
-- ('Gabriel', 'Polotti', 'gpolotti11', 'oE7hbQyqDj', 'gpolotti11@statcounter.com', 78724153231, 'Uzlovaya', 'Russia', '301649', 48.4089744, 135.123385, 'https://robohash.org/sitveniamsint.jpg?size=50x50&set=set1', 'implement sticky relationships', 'Multi-tiered dedicated encryption'),
-- ('Livvie', 'Corthes', 'lcorthes12', 'MBa9e8', 'lcorthes12@twitter.com', 864436256968, 'Fuqiang', 'China', null, 25.721143, 119.384334, 'https://robohash.org/remeiusqui.jpg?size=50x50&set=set1', 'engineer intuitive deliverables', 'Vision-oriented bi-directional service-desk'),
-- ('Kylen', 'Snook', 'ksnook13', 'nNTekv8duTnf', 'ksnook13@stanford.edu', 861719902766, 'Huantuo', 'China', null, 39.22909, 117.324531, 'https://robohash.org/maioresautquos.jpg?size=50x50&set=set1', 'aggregate cutting-edge vortals', 'Extended regional artificial intelligence'),
-- ('Paton', 'Capinetti', 'pcapinetti14', 'hb9niA8bwHlX', 'pcapinetti14@hostgator.com', 868409884454, 'Siqian', 'China', null, 30.711012, 116.242861, 'https://robohash.org/quoillocorporis.jpg?size=50x50&set=set1', 'extend value-added models', 'Enhanced 24 hour workforce'),
-- ('Helyn', 'Carr', 'hcarr15', 'DfDam9', 'hcarr15@freewebs.com', 5023351453674, 'San Cristóbal Cucho', 'Guatemala', '12027', 14.904946, -91.780213, 'https://robohash.org/etpariaturest.jpg?size=50x50&set=set1', 'streamline rich e-commerce', 'Visionary discrete solution'),
-- ('Rivi', 'Mathivon', 'rmathivon16', 'Jwgbge4', 'rmathivon16@phoca.cz', 556064526474, 'Granja', 'Brazil', '62430000', -3.2575968, -41.0394028, 'https://robohash.org/suntnobiseum.jpg?size=50x50&set=set1', 'incubate frictionless metrics', 'Streamlined directional migration'),
-- ('Leilah', 'Mayhou', 'lmayhou17', 'lsq4y2J0', 'lmayhou17@imgur.com', 14359608302, 'Waco', 'United States', '76796', 31.1393795, -97.8047404, 'https://robohash.org/nonsuscipitperspiciatis.jpg?size=50x50&set=set1', 'orchestrate interactive relationships', 'Versatile executive encryption'),
-- ('Bernardina', 'Reeds', 'breeds18', 'NMrKcCqjt', 'breeds18@constantcontact.com', 74295532107, 'Dzerzhinskiy', 'Russia', '140083', 55.599064, 37.9145292, 'https://robohash.org/estdolorespraesentium.jpg?size=50x50&set=set1', 'scale wireless channels', 'Focused discrete secured line'),
-- ('Johnath', 'Ranner', 'jranner19', '8rwBQHnsN', 'jranner19@google.ca', 305736516196, 'Mouzourás', 'Greece', null, 35.5390834, 24.15476, 'https://robohash.org/veniambeataeomnis.jpg?size=50x50&set=set1', 'transform transparent applications', 'Devolved transitional protocol'),
-- ('Adair', 'Peaker', 'apeaker1a', 'wcfj40E', 'apeaker1a@facebook.com', 817064830162, 'Inuyama', 'Japan', '9380043', 36.8603732, 137.4284822, 'https://robohash.org/occaecatinihilnatus.jpg?size=50x50&set=set1', 'exploit back-end architectures', 'Fully-configurable multi-tasking throughput'),
-- ('Corena', 'Nevison', 'cnevison1b', 'UBBh0K', 'cnevison1b@plala.or.jp', 812846202159, 'Kuroiso', 'Japan', '3250017', 36.9832371, 140.0373221, 'https://robohash.org/maioreseosdoloremque.jpg?size=50x50&set=set1', 'extend world-class supply-chains', 'Re-contextualized grid-enabled service-desk'),
-- ('Joann', 'Pail', 'jpail1c', 's8lWS7x8TvuH', 'jpail1c@nps.gov', 351336265644, 'Nagoselo do Douro', 'Portugal', '5130225', 41.1814553, -7.4179536, 'https://robohash.org/possimuseoset.jpg?size=50x50&set=set1', 'architect plug-and-play relationships', 'Diverse mobile artificial intelligence')