--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: -
--

COPY pgsodium.key (id, status, created, expires, key_type, key_id, key_context, name, associated_data, raw_key, raw_key_nonce, parent_key, comment, user_data) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, username, password, organizacion, nombre, apellido) FROM stdin;
1	jorge_18	e4ae9a3d329d1002bfc696a4fbb057355e2a08781f7744fe043e101188c0c93e	Ciudad Lab	Jorge 	Leon
2	tierraviva	5b95ebabd34336f5c9f490d2f341530653f2a81058b63660a9984a9cced78dda	Fundacion Tierra Viva	Fundacion	TierraViva
3	esbaratao	2c9a893725afc92dd0a1609b7a23a282e343c47f6482e8c71f1d35dc7a09beee	Es baratao	Fundacion	Esbaratao
4	redsoc	590f56333c85ef7b25a4da8bce55a5df943d3bbeb9e4bcce4f0ae173b8211b03	Redsoc	Redsoc	Redsoc
5	fundimpronta	63b188781155710000e5acd866d77baad7efc77421cf8bc985096d052b994fc3	Fundacion Impronta	Fundacion	Impronta
6	todosporelfuturo	351eba74e41a7c370e6d0e1387d3cbe0eab95b6532b1637217a003f90f233cb7	Todos por el futuro	Todos	Por El Futuro
7	reusamas24	1effda1ccb02cdd59df07a2c3b03048d8b276f366b462bcb9121bc70317d8d52	Reusamas	Reusamas	Reusamas
8	ciudadlab	cda5d88019801818651d780d7cf4334d7a78a631531ee5643e8c39c1bea77c43	Ciudad Lab	Ciudad	Lab
9	admin	346c63ba175b3011fd5683fac2436d0d3da72c125299730b784b40ec04f02429		admin	admin
\.


--
-- Data for Name: actionA1; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."actionA1" (id, nombre, type, fecha_inicio, fecha_final, localidad, nro_participantes, nro_mujeres, nro_noid, nro_pob_ind, nro_pob_lgbtiq, nro_pob_rural, nro_pob_16_29, nro_lid_pob_16_29, organizacion, tipo_localidad, descripcion, nombre_real, "imgUrl") FROM stdin;
5	Salidas de campo / actividades al aire libre	A4-Redes y eventos	2023-10-14 04:00:00	2024-03-23 04:00:00	Delta Amacuro	338	204	-9	\N	0	338	203	203	Fundacion Tierra Viva	Rural	Aumentar los conocimientos de los jóvenes sobre biodiversidad en las instituciones educativas de la cuenca del río Canoabo. Los materiales educativos producidos se distribuyen a al menos 10 instituciones educativas y se incorporan a las actividades escolares.El evento público (Festival de la Biodiversidad) se convierte en un referente significativo para las autoridades escolares.	Liderazgo ambiental canoabo Programa Formativo en Biodiversidad (Mitsubishi)	\N
6	Reforestación / restauración	A4-Redes y eventos	2024-06-22 04:00:00	2024-07-13 04:00:00	Delta Amacuro	15	9	0	\N	0	15	6	6	Fundacion Tierra Viva	Rural	a actividad de pintar el mural no solo embellece el entorno, sino que también promueve el trabajo en equipo, fortalece el sentido de comunidad y brinda a los jóvenes la oportunidad de desarrollar habilidades de liderazgo y compromiso cívico.\n\nFomento del Sentido de Pertenencia: Al colaborar en la creación del mural, los jóvenes del programa de liderazgo ambiental se involucran activamente en embellecer su entorno, lo que puede fortalecer su sentido de pertenencia a la comunidad y su compromiso con el cuidado del medio ambiente \n.\nPromoción del Trabajo en Equipo: La colaboración para pintar el mural fomenta el trabajo en equipo entre los jóvenes, lo que les permite desarrollar habilidades de comunicación, coordinación y cooperación, fundamentales para su crecimiento personal y profesional.\n\nImpacto en la Comunidad: El mural embellecerá el sector Boquerón y servirá como una estación en la actividad de la bicicletada, lo que puede contribuir a fortalecer el sentido de comunidad y a promover un estilo de vida saludable y sostenible en la zona \n.\nDesarrollo de Liderazgo: La participación en esta acción local brinda a los jóvenes la oportunidad de desarrollar habilidades de liderazgo, empoderándolos para ser agentes de cambio positivo en su entorn	Programa de Liderazgo Ambiental Mural de Bicicletada Ecologica	\N
7	Ciclo formativo ecoturismo	A4-Redes y eventos	2024-01-19 04:00:00	2024-04-13 04:00:00	Delta Amacuro	42	28	0	\N	0	42	25	25	Fundacion Tierra Viva	Rural	El programa formativo de emprendimiento turístico sustentable que se encuentra en su segunda fase busca promover varios cambios clave en la comunidad de Canoabo, centrados en el desarrollo de habilidades y conocimientos que potencien el uso de sus recursos naturales y culturales.\n\n**1. Formación en Finanzas para Emprendimiento:**\nSe pretende capacitar a los jóvenes en la gestión financiera, proporcionándoles las herramientas necesarias para manejar sus recursos de manera efectiva. Esto incluye la elaboración de presupuestos, el manejo de costos y la búsqueda de financiamiento, lo que les permitirá desarrollar emprendimientos turísticos sostenibles y rentables.\n\n**2. Desarrollo e Implementación de un Plan de Negocio Método Canva:**\nEl uso del método Canva facilitará a los jóvenes la creación de planes de negocio claros y concisos. A través de esta metodología, aprenderán a identificar su propuesta de valor, segmentar a sus clientes y definir las actividades clave, lo que les ayudará a estructurar sus ideas de negocio de manera efectiva y a entender mejor el mercado turístico.\n\n**3. Clases de Inglés Técnico Instrumental:**\nLas clases de inglés técnico instrumental están diseñadas para mejorar las habilidades comunicativas de los jóvenes en el ámbito turístico. Al dominar el inglés, podrán interactuar con turistas internacionales, acceder a información relevante y ampliar sus oportunidades laborales, lo que es esencial en un sector globalizado como el turismo.\n\n**4. Promoción del Uso Sostenible de Recursos Naturales y Culturales:**\nEl programa enfatizará la importancia de utilizar los recursos naturales y culturales de manera responsable. Los jóvenes serán formados en prácticas que promuevan la conservación y el respeto por el medio ambiente y el patrimonio cultural, asegurando que el desarrollo turístico beneficie a la comunidad sin comprometer su riqueza natural y cultural.\n\n**5. Empoderamiento y Liderazgo Juvenil:**\nAl involucrar a los jóvenes en este proceso formativo, se busca empoderarlos para que se conviertan en líderes en sus comunidades. Fomentar una mentalidad emprendedora y proactiva les permitirá no solo desarrollar sus propios proyectos, sino también inspirar a otros a participar en iniciativas que beneficien a Canoabo.\n\nEl programa formativo de emprendimiento turístico sustentable en su segunda fase se enfoca en equipar a los jóvenes de Canoabo con las herramientas necesarias para emprender de manera sostenible, promoviendo el uso responsable de los recursos y el desarrollo de habilidades clave que contribuirán al crecimiento económico y cultural de la comunidad.	Programa de Emprendimiento Turístico Sustentable II Etapa Formativa del programa	\N
8	Ciclos formativos en acción socioambiental /ciberactivismo	A4-Redes y eventos	2024-07-20 04:00:00	2024-07-20 04:00:00	Delta Amacuro	38	24	0	\N	0	38	18	18	Fundacion Tierra Viva	Rural	La actividad de formación de los jóvenes del grupo de Canoabo como Capitanes de Playas tiene como objetivo promover varios cambios significativos en las personas, la comunidad y las organizaciones involucradas.\nCambios en las Personas\nEmpoderamiento y Conciencia Ambiental: La formación busca empoderar a los jóvenes, brindándoles herramientas y conocimientos sobre la clasificación, pesado y registro de residuos sólidos. Esto no solo aumenta su conciencia sobre la problemática de la contaminación en las costas, sino que también los convierte en agentes activos de cambio en su entorno.\nCambios en la Comunidad\nParticipación Activa: Al involucrar a los jóvenes en la organización del Día Mundial de las Playas, se fomenta la participación activa de la comunidad en la conservación del ambiente. Esto puede generar un sentido de pertenencia y responsabilidad hacia el cuidado de los recursos naturales locales \n.\nCambios en las Organizaciones\nColaboración y Comunicación: La actividad también propicia un espacio para que los jóvenes se postulen en roles que apoyen la comunicación, logística y organización de futuras actividades. Esto puede fortalecer la colaboración entre diferentes grupos y organizaciones, mejorando la efectividad de las iniciativas ambientales.	Programa de Liderazgo Ambiental Taller del Dia Mundial de las Playas	\N
9	Acciones en áreas públicas	A4-Redes y eventos	2024-09-21 04:00:00	2024-09-21 04:00:00	Delta Amacuro	32	17	0	\N	0	32	13	13	Fundacion Tierra Viva	Rural	Cambios que Quiere Promover la Actividad\nLa actividad busca promover varios cambios significativos en las personas, la comunidad y las organizaciones:\n-Conciencia Ecológica: Se pretende aumentar la conciencia sobre la contaminación en las playas ribereñas, sensibilizando a los participantes sobre la gravedad de este problema y su impacto en el ambiente.\n-Compromiso Activo: La actividad estimula un compromiso activo hacia la conservación de los espacios naturales, alentando a los individuos y grupos a involucrarse en acciones que protejan y restauren el ambiente.\n-Participación Comunitaria: Se busca fortalecer la participación de la comunidad en iniciativas ambientales, promoviendo la colaboración entre diferentes sectores y fomentando un sentido de pertenencia y responsabilidad compartida.\n-Liderazgo Juvenil: Al integrar jóvenes en el programa de liderazgo ambiental del proyecto Generación Sustentable, se espera que estos se conviertan en líderes comunitarios que inspiren y guíen a otros hacia prácticas sustentable.\n-Cambio de Hábitos: La actividad tiene como objetivo motivar a las personas a cambiar sus hábitos hacia estilos de vida más sustentables, promoviendo la reducción de residuos, el reciclaje y el cuidado de los espacios naturales.\n-Fortalecimiento de Organizaciones: Se espera que las organizaciones involucradas se fortalezcan a través de la colaboración y la implementación de estrategias que fomenten la sostenibilidad en sus operaciones y actividades.	Programa de Liderazgo Ambiental Dia Mundial De Las Playas	\N
10	Salidas de campo / actividades al aire libre	A4-Redes y eventos	2024-10-05 04:00:00	2024-10-05 04:00:00	Delta Amacuro	33	14	0	\N	0	33	20	20	Fundacion Tierra Viva	Rural	Estos cambios pueden ser agrupados en varias áreas clave:\n1. Conciencia Ambiental y Educación\nLa introducción al Programa Ambiental de la reserva generara una mayor conciencia ambiental en los jóvenes y la comunidad, impulsando acciones para proteger y preservar los recursos naturales.\n2. Desarrollo de Habilidades Personales y Profesionales\nLas actividades de team building, comunicación efectiva, liderazgo y resolución de problemas están diseñadas para equipar a los participantes con habilidades interpersonales y de liderazgo. Esto no solo beneficia a los jóvenes en su desarrollo personal, sino que también los prepara para futuras oportunidades laborales y de voluntariado en el ámbito ambiental y comunitario.\n3. Fortalecimiento del Trabajo en Equipo\nEl enfoque en el trabajo en equipo y la creación de un mapa de senderismo promueve la colaboración y el entendimiento entre los participantes. Este aspecto es crucial para construir una comunidad unida y resiliente, donde los miembros trabajen juntos hacia objetivos comunes.\n4. Empoderamiento Comunitario\nAl involucrar a jóvenes en actividades de liderazgo y en la elaboración de ponencias, se les brindas herramientas  para que se conviertan en agentes de cambio en sus comunidades. Esto puede inspirar a otros a involucrarse en iniciativas ambientales y sociales, creando un efecto multiplicador.\n5. Fomento de la Sostenibilidad\nAl enseñar sobre capacidades de carga y manejo de grupos en entornos naturales, se promueve un enfoque sostenible hacia el uso de recursos. Los participantes aprenden a valorar el equilibrio entre la utilización y la conservación, lo que es fundamental para el desarrollo sostenible de la región.\n6. Apreciación de la Naturaleza\nLa experiencia en un entorno natural como la Reserva Ecológica Guaquira permite que los jóvenes desarrollen un vínculo emocional con la naturaleza. Esta conexión es esencial para fomentar una cultura de respeto y cuidado hacia el ambiente.	Programa de Liderazgo Ambiental Taller de guias por la naturaleza	\N
11	Festival, desfiles, marchas, rodadas, campañas de arte	A4-Redes y eventos	2024-07-06 04:00:00	2024-07-06 04:00:00	Delta Amacuro	33	23	0	\N	0	\N	17	17	Es baratao	Urbana	Un consumo más responsable de ropa, concientizando a los participantes en temas de sostenibilidad al vestir.	Cine Foro Cine Foro - La moda de la Basura	\N
12	Ciclo formativo moda sustentable	A4-Redes y eventos	2024-06-15 04:00:00	2024-07-06 04:00:00	Delta Amacuro	17	14	0	\N	1	\N	16	16	Es baratao	Urbana	Capacitar a emprendedores de moda en temas de reutilización y moda sostenible	Creadores de la moda Consciente 2da edición Ciclo formativo	\N
13	Ferias de emprendimiento sostenbile	A4-Redes y eventos	2024-09-14 04:00:00	2024-09-14 04:00:00	Delta Amacuro	65	40	0	\N	4	\N	48	48	Es baratao	Urbana	Visibilizar el trabajo de ecoemprendedores comprometidos con la moda circular y el rescate de prendas de otras épocas o en desuso.	Second Hand Exprience Bazar Second Hand Experience Bazar	\N
14	Ciclo formativo moda sustentable	A4-Redes y eventos	2024-09-21 04:00:00	2024-10-12 04:00:00	Delta Amacuro	16	11	0	\N	1	\N	14	14	Es baratao	Urbana	Difundir herramientas teóricas y prácticas sobre sostenibilidad en los procesos del emprendimiento, fortalecer la misión y valores de las marcas, crear campañas comunicacionales responsables y organizar las finanzas del emprendimiento.	Creadorxs de la Moda Consciente 3ra edición Ciclo formativo	\N
15	Encuentros juveniles	A4-Redes y eventos	2024-10-26 04:00:00	2024-10-26 04:00:00	Delta Amacuro	37	22	7	\N	2	\N	33	33	Es baratao	Urbana	Evento Creadorxs de la Moda Consciente 3ra edición efectuado en Valencia.	Encuentro de ecoemprendedores Full day creadorxs	\N
16	Encuentros juveniles	A4-Redes y eventos	2024-11-09 04:00:00	2024-10-11 04:00:00	Delta Amacuro	80	45	0	\N	0	80	49	49	Fundacion Tierra Viva	Rural	motivar a los jóvenes como agentes de cambio. Las actividades realizadas fomentaron el trabajo en equipo y la reflexión sobre el impacto ambiental, dejando a los participantes motivados para continuar trabajando por un futuro más sostenible. Las anécdotas compartidas, como los desafíos enfrentados durante las actividades y las conexiones personales formadas, reflejan el impacto positivo y duradero del evento en los jóvenes participantes.	Encuentro Juvenil Generación Sustentable 2024 Encuentro Juvenil Generación Sustentable 2024	\N
18	Acciones en áreas públicas	A4-Redes y eventos	2024-07-06 04:00:00	2024-09-21 04:00:00	Delta Amacuro	48	24	2	\N	0	\N	42	42	Fundacion Tierra Viva	Urbana	Es una oportunidad para sensibilizar a las comunidades sobre la importancia de la buena gestión de residuos, el consumo responsable y la promoción de políticas públicas en pro de la conservación de nuestras costas y playas	Escultismo y Liderazgo Ambiental Embajadores de la Marea de Plastico	\N
19	Ciclos formativos en acción socioambiental /ciberactivismo	A4-Redes y eventos	2024-10-05 04:00:00	2024-12-05 04:00:00	Delta Amacuro	14	11	0	\N	0	\N	14	14	Fundacion Tierra Viva	Urbana	Promover el uso de las energías alternativas a través de experimentos sencillos aplicables en la vida cotidiana	Escultismo y Liderazgo Ambiental Go Solar	\N
20	Ciclos formativos en acción socioambiental /ciberactivismo	A1-Ciclos Formativos	2025-02-11 04:00:00	2025-02-27 04:00:00	Delta Amacuro	111	10	10	0	10	64	50	20	Es baratao	Rural	fdfasfs	Actividad Prueba	
17	Ciclos formativos en acción socioambiental /ciberactivismo	A4-Redes y eventos	2024-04-26 04:00:00	2024-06-15 04:00:00	Delta Amacuro	73	30	0	\N	0	\N	73	73	Fundacion Tierra Viva	Urbana	la educación y la promoción de acciones sostenibles. Para enfrentar los desafíos ambientales actuales y asegurar un futuro más sostenible para las próximas generaciones, con acciones que promuevan cambio en la conservación de la Biodiversidad	Escultismo y Liderazgo Ambiental Campeones por la Naturaleza	\N
2	Ciclos formativos en acción socioambiental /ciberactivismo	A1-Ciclos Formativos	2023-10-14 04:00:00	2024-03-23 04:00:00	Carabobo	338	204	2	0	0	338	203	203	Fundacion Tierra Viva	Rural	Aumentar los conocimientos de los jóvenes sobre biodiversidad en las instituciones educativas de la cuenca del río Canoabo. Los materiales educativos producidos se distribuyen a al menos 10 instituciones educativas y se incorporan a las actividades escolares.El evento público (Festival de la Biodiversidad) se convierte en un referente significativo para las autoridades escolares.	Liderazgo Ambiental Canoabo	https://utfs.io/f/031b2019-64d4-4874-9000-cee94c35288b-siahyx.png
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-01-24 21:44:09
20211116045059	2025-01-24 21:44:10
20211116050929	2025-01-24 21:44:12
20211116051442	2025-01-24 21:44:13
20211116212300	2025-01-24 21:44:14
20211116213355	2025-01-24 21:44:15
20211116213934	2025-01-24 21:44:16
20211116214523	2025-01-24 21:44:18
20211122062447	2025-01-24 21:44:19
20211124070109	2025-01-24 21:44:20
20211202204204	2025-01-24 21:44:21
20211202204605	2025-01-24 21:44:23
20211210212804	2025-01-24 21:44:26
20211228014915	2025-01-24 21:44:27
20220107221237	2025-01-24 21:44:29
20220228202821	2025-01-24 21:44:30
20220312004840	2025-01-24 21:44:31
20220603231003	2025-01-24 21:44:33
20220603232444	2025-01-24 21:44:34
20220615214548	2025-01-24 21:44:35
20220712093339	2025-01-24 21:44:36
20220908172859	2025-01-24 21:44:38
20220916233421	2025-01-24 21:44:39
20230119133233	2025-01-24 21:44:40
20230128025114	2025-01-24 21:44:41
20230128025212	2025-01-24 21:44:43
20230227211149	2025-01-24 21:44:44
20230228184745	2025-01-24 21:44:45
20230308225145	2025-01-24 21:44:46
20230328144023	2025-01-24 21:44:47
20231018144023	2025-01-24 21:44:49
20231204144023	2025-01-24 21:44:50
20231204144024	2025-01-24 21:44:52
20231204144025	2025-01-24 21:44:53
20240108234812	2025-01-24 21:44:54
20240109165339	2025-01-24 21:44:55
20240227174441	2025-01-24 21:44:57
20240311171622	2025-01-24 21:44:59
20240321100241	2025-01-24 21:45:01
20240401105812	2025-01-24 21:45:04
20240418121054	2025-01-24 21:45:06
20240523004032	2025-01-24 21:45:10
20240618124746	2025-01-24 21:45:11
20240801235015	2025-01-24 21:45:12
20240805133720	2025-01-24 21:45:14
20240827160934	2025-01-24 21:45:15
20240919163303	2025-01-24 21:45:18
20240919163305	2025-01-24 21:45:20
20241019105805	2025-01-24 21:45:21
20241030150047	2025-01-24 21:45:26
20241108114728	2025-01-24 21:45:27
20241121104152	2025-01-24 21:45:29
20241130184212	2025-01-24 21:45:30
20241220035512	2025-01-24 21:45:31
20241220123912	2025-01-24 21:45:32
20241224161212	2025-01-24 21:45:33
20250107150512	2025-01-24 21:45:35
20250110162412	2025-01-24 21:45:36
20250123174212	2025-01-24 21:45:37
20250128220012	2025-01-31 13:37:24
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-01-24 21:43:27.259315
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-01-24 21:43:27.285322
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-01-24 21:43:27.303046
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-01-24 21:43:27.342616
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-01-24 21:43:27.385581
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-01-24 21:43:27.404932
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-01-24 21:43:27.421542
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-01-24 21:43:27.438968
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-01-24 21:43:27.460505
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-01-24 21:43:27.485644
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-01-24 21:43:27.508973
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-01-24 21:43:27.528001
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-01-24 21:43:27.547858
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-01-24 21:43:27.57278
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-01-24 21:43:27.590703
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-01-24 21:43:27.633604
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-01-24 21:43:27.659103
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-01-24 21:43:27.676661
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-01-24 21:43:27.69499
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-01-24 21:43:27.714589
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-01-24 21:43:27.732673
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-01-24 21:43:27.755774
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-01-24 21:43:27.798216
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-01-24 21:43:27.840829
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-01-24 21:43:27.859178
25	custom-metadata	67eb93b7e8d401cafcdc97f9ac779e71a79bfe03	2025-01-24 21:43:27.880843
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: -
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
\.


--
-- Data for Name: seed_files; Type: TABLE DATA; Schema: supabase_migrations; Owner: -
--

COPY supabase_migrations.seed_files (path, hash) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: -
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_id_seq"', 9, true);


--
-- Name: actionA1_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."actionA1_id_seq"', 20, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

