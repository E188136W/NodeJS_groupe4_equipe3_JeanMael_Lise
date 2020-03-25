#!/bin/sh

#Affichage des catÃ©gorie
echo '------------------------------------------------------------------------------'
echo "Affichage des bières"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la première bière"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une biere inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/66666
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de bieres selon un degré d'acool"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/deg/15
echo



