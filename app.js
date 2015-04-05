/**
 * Created by Bruce on 3/23/2015.
 */

angular.module('angularCloudSearchDemo', [ 'ui.bootstrap'])
    .controller('TypeaheadCtrl', function($scope, $http) {

        $scope.listOfSuggestions = null;
        $scope.listOfItems = null;
        $scope.cloudSearchDomain = 'search-angularcsdemo-ypaa5qjlmpctwoty2cfbetxhay.us-east-1.cloudsearch.amazonaws.com';

        $scope.onSelect = function ($item, $model, $label) {
            $scope.$item = $item;
            $scope.$model = $model;
            $scope.$label = $label;
        };

        $scope.updateSuggestions = function(val) {
            return $http.get('http://localhost:8080/' + $scope.cloudSearchDomain + '/2013-01-01/suggest?', {
                params: {
                    q: val,
                    suggester: 'csdescription'
                }
            }).then(function(response){

                return $scope.listOfSuggestions = response.data.suggest.suggestions;
            });
        };

        $scope.searchSuggestions = function(val) {
            return $http.get('http://localhost:8080/' + $scope.cloudSearchDomain + '/2013-01-01/search?', {
                params: {
                    q: val.suggestion,
                    return: '_all_fields'
                }
            }).then(function(response){
                return $scope.listOfItems = response.data.hits;
            });
        };

    });

/*

http://search-juiry-xgxsk7jump6yroxfs7i2ijefrm.us-east-1.cloudsearch.amazonaws.com/2013-01-01/
// search?q=2f7c7729-76ae-b38c-8ece-e1e9ef674667&return=_all_fields

 http://search-juiry-xgxsk7jump6yroxfs7i2ijefrm.us-east-1.cloudsearch.amazonaws.com/2013-01-01/
 search?q=Test+Update&return=_all_fields%2C_score&highlight.challengedescription=%7B%22max_phrases%22%3A3%2C%22format%22%3A%22text%22%2C%22pre_tag%22%3A%22*%23*%22%2C%22post_tag%22%3A%22*%25*%22%7D&highlight.challengeid=%7B%22max_phrases%22%3A3%2C%22format%22%3A%22text%22%2C%22pre_tag%22%3A%22*%23*%22%2C%22post_tag%22%3A%22*%25*%22%7D&highlight.challengeid_review=%7B%22max_phrases%22%3A3%2C%22format%22%3A%22text%22%2C%22pre_tag%22%3A%22*%23*%22%2C%22post_tag%22%3A%22*%25*%22%7D&highlight.challengemediasrc=%7B%22max_phrases%22%3A3%2C%22format%22%3A%22text%22%2C%22pre_tag%22%3A%22*%23*%22%2C%22post_tag%22%3A%22*%25*%22%7D&highlight.challengename=%7B%22max_phrases%22%3A3%2C%22format%22%3A%22text%22%2C%22pre_tag%22%3A%22*%23*%22%2C%22post_tag%22%3A%22*%25*%22%7D&highlight.completionrewardpayload=%7B%22max_phrases%22%3A3%2C%22format%22%3A%22text%22%2C%22pre_tag%22%3A%22*%23*%22%2C%22post_tag%22%3A%22*%25*%22%7D&highlight.status=%7B%22max_phrases%22%3A3%2C%22format%22%3A%22text%22%2C%22pre_tag%22%3A%22*%23*%22%2C%22post_tag%22%3A%22*%25*%22%7D&highlight.winnerrewardpayload=%7B%22max_phrases%22%3A3%2C%22format%22%3A%22text%22%2C%22pre_tag%22%3A%22*%23*%22%2C%22post_tag%22%3A%22*%25*%22%7D&sort=_score+desc
    */