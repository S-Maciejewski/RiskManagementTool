-- Enums
insert into public.impact (id, name, value) values (1, 'Low', 1);
insert into public.impact (id, name, value) values (2, 'Moderate', 2);
insert into public.impact (id, name, value) values (3, 'High', 3);
insert into public.probability (id, name, value) values (1, 'Very unlikely', 1);
insert into public.probability (id, name, value) values (2, 'Unlikely', 2);
insert into public.probability (id, name, value) values (3, 'Medium likelihood', 3);
insert into public.probability (id, name, value) values (4, 'Likely', 4);
insert into public.probability (id, name, value) values (5, 'Very likely', 5);
insert into public.severity (id, name, value) values (1, 'Minor', 1);
insert into public.severity (id, name, value) values (2, 'Moderate', 2);
insert into public.severity (id, name, value) values (3, 'Critical', 3);

-- Users
insert into public.user (id, login, password) values (1, 'Piotr', 'pwd');
insert into public.user (id, login, password) values (2, 'Jan', 'pwd');
insert into public.user (id, login, password) values (3, 'Kuba', 'pwd');
insert into public.user (id, login, password) values (4, 'Seba', 'pwd');
insert into public.user (id, login, password) values (5, 'Marcin', 'pwd');
insert into public.user_project (user_id, project_id) values (1, 1);
insert into public.user_project (user_id, project_id) values (2, 1);
insert into public.user_project (user_id, project_id) values (3, 1);
insert into public.user_project (user_id, project_id) values (4, 1);
insert into public.user_project (user_id, project_id) values (5, 1);
insert into public.user_project (user_id, project_id) values (1, 2);
insert into public.user_project (user_id, project_id) values (2, 2);

-- Projects, registers, risks and responses
insert into public.project (id, name, description) values (1, 'Moon base', 'Building an operational, self sustainable moon base... on the moon!');
insert into public.project (id, name, description) values (2, 'Mars orbital station', 'Building an orbital station on the orbit of Mars');
insert into public.risk_register (id, project_id, name, description) values (1, 1, 'Transport risks', 'Risks regarding transportation of people and equipment to the moon');
insert into public.risk_register (id, project_id, name, description) values (2, 1, 'Habitat risks', 'Risks regarding building and sustaining a permanent habitat on the moon');
insert into public.risk_register (id, project_id, name, description) values (3, 2, 'Orbital risks', 'It is difficult to position the station properly, isn''t it?');
insert into public.risk (id, register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (1, 1, '2020-04-28', 'Lack of funds for rockets', 'Rockets are pretty expensive and we''re gonna need a lot of them', 'Assessed by financial department, TBD by end of May', 3, 4, 2);
insert into public.risk (id, register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (3, 1, '2020-04-29', 'Rocket breakdown', 'Rockets are complex and prone to malfunction', 'Engineering department is coming up with tests (april 2020)', 1, 1, 3);
insert into public.risk (id, register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (2, 2, '2020-04-27', 'Lack of trained crew', 'It is difficult to find the right crew for such a dangerous mission', 'HR has difficulties to find crew as for 04.2020', 3, 2, 3);
insert into public.risk (id, register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (5, 1, '2020-04-01', 'Launchpad taken', 'Launchpad in the space launch center might be reserved by another company for a long time, we might have a problem finding suitable time window', 'To be assessed, we are in contact with the space center', 1, 2, 1);
insert into public.risk (id, register_id, date_raised, name, description, status, impact_id, probability_id, severity_id) values (4, 2, '2020-04-28', 'Radiation exposure', 'Equipment may break down due to space radiation', 'To be assessed', 2, 3, 1);
insert into public.risk_property (id, risk_id, name, description, quantiative_value) values (1, 1, 'Funds needed', 'In $ billions', 150);
insert into public.risk_property (id, risk_id, name, description, quantiative_value) values (2, 1, 'Loan interest rates', 'Our company has some problems with loans, the best we can do right now is about 12%', null);
insert into public.risk_property (id, risk_id, name, description, quantiative_value) values (3, 2, 'Crew needed', 'Amount of necessary crew members', 24);
insert into public.response (id, risk_id, name, description, expected_result, progress) values (1, 1, 'Kickstarter', 'Launch a kickstarter campaign!', 'Some additional funds', 'To be done');
insert into public.response (id, risk_id, name, description, expected_result, progress) values (2, 1, 'Outsource R&D team', 'Outsource our R&D team in order to make some additional cash', 'Additional cash inflow, slower progress on our R&D projects', 'Decision to be made, client found');
insert into public.response (id, risk_id, name, description, expected_result, progress) values (3, 2, 'Free pizza', 'Offer free pizza for life for the crew and their families', 'Some minor additional costs, possible rise in job applications for crew members', 'Is it really a good idea?');
